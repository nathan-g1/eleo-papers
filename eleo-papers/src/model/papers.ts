export class Paper {
    // Paper class has title, author, year, institution, and content
    title: string;
    author: string;
    year: Date;
    institution: string;
    content: string;

    constructor(title: string, author: string, content: string, year?: Date, institution?: string) {
        this.title = title;
        this.author = author;
        this.content = content;
        this.year = year || new Date();
        this.institution = institution || "NA";
    }

    // Create a paper using setter methods
    public createPaper = (title: string, author: string, content: string, year?: Date, institution?: string): Paper => {
        this.setTitle(title);
        this.setAuthor(author);
        this.setContent(content);
        this.setYear(year || new Date());
        this.setInstitution(institution || "NA");
        return this;
    }

    // Getters and setters
    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getYear(): Date {
        return this.year;
    }

    getInstitution(): string {
        return this.institution;
    }

    getContent(): string {
        return this.content;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    setAuthor(author: string): void {
        this.author = author;
    }

    setYear(year: Date): void {
        this.year = year;
    }

    setInstitution(institution: string): void {
        this.institution = institution;
    }

    setContent(content: string): void {
        this.content = content;
    }

    // toString method
    toString(): string {
        return this.title + " by " + this.author + " (" + this.year + ") at " + this.institution;
    }

    toJSON(): string {
        return JSON.stringify({
            title: this.title,
            author: this.author,
            year: this.year,
            institution: this.institution,
            content: this.content
        });
    }

    // hashCode method
    hashCode(): number {
        return this.title.length + this.author.length + this.year.getTime() + this.institution.length + this.content.length;
    }

    isValid(): boolean {
        return this.title.length > 0 && this.author.length > 0 && this.content.length > 0;
    }
}