import fs from "fs";
import path from "path";
import { BlockFrostIPFS } from '@blockfrost/blockfrost-js';
import { ensureEnvVar } from "../utils/util";
import { Paper } from "../model/papers";

const IPFS = new BlockFrostIPFS({
    projectId: ensureEnvVar("PROJECT_ID")
});

export const addFileAndPin = async (pathToFile: string): Promise<string> => {
    //  check if file exists
    const exists = fs.existsSync(pathToFile);
    if (!exists) throw new Error("File does not exist");

    //  add file to IPFS
    const added = await IPFS.add(pathToFile);

    await IPFS.pin(added.ipfs_hash);
    return added.ipfs_hash;
};


export const addPaperAndPin = async (paper: Paper): Promise<string> => {
    //  check if paper is valid
    if (!paper.isValid()) throw new Error("Paper is not valid");

    //  add paper to file and then to IPFS ## This could be improved
    const fileTemp = new Date().getTime() + "-paper.json";
    // Create file fileTemp
    fs.writeFileSync(path.join(__dirname, fileTemp), paper.toJSON() + "\n");

    const added = await IPFS.add(path.join(__dirname, fileTemp));
    const pinned = await IPFS.pin(added.ipfs_hash);

    // update papers.json that keeps track of all papers with their hashes
    const papers = "papers.json";
    let memory = fs.readFileSync(path.join(__dirname, papers)).toString();
    memory = JSON.parse(memory);
    memory[paper.title] = {
        hash: added.ipfs_hash,
    };

    // update papers.json
    fs.writeFileSync(path.join(__dirname, papers), JSON.stringify(memory) + "\n");
    // Delete file fileTemp
    fs.rmSync(path.join(__dirname, fileTemp));

    return added.ipfs_hash;
};

