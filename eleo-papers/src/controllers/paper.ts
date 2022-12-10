import cors from "cors";
import express, { Request, Response } from "express";
import message from "../constant/message";
import { addPaperAndPin } from "../ipfs/ipfs";
import { Paper } from "../model/papers";
import Validator from "./validator";

export default class PaperController {
    public path = "/papers";
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes = () => {
        this.router.use(cors());
        this.router.post('/add', this.addPaper);
        this.router.get('/:hash', this.getPaper);
    }

    private addPaper = async (req: Request, res: Response) => {
        const body = req.body;

        const { error } = Validator.createPaper.validate(body);

        if (error) return res.status(400).json({
            error: message.INVALID_BODY,
            message: error.details.map(er => er.message)
        });

        try {
            // Create a new paper
            const paper = new Paper(body.title, body.author, body.content, body.year, body.institution);
            // Add new IPFS hash to the paper
            const paperHash = await addPaperAndPin(paper);
            return res.status(200).json({ paperLink: `https://ipfs.io/ipfs/${paperHash}` });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    private getPaper = async (req: Request, res: Response) => {
        const hash = req.params.hash;
        try {
            // make a fetch request to the IPFS gateway with the hash in the query
            const response = await fetch(`https://ipfs.io/ipfs/${hash}`);
            return res.status(200).json({ paper: await response.json() });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}