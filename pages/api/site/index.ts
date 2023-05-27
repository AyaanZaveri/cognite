import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const getSiteDocs = async (req: any, res: any) => {
  const loader = new CheerioWebBaseLoader(
    "https://sites.google.com/pdsb.net/twsstudentservices/woodlands-club-hub",
    {
      selector: "div[class='LS81yb VICjCf j5pSsc db35Fc']",
    }
  );
  const loader2 = new CheerioWebBaseLoader(
    "https://sites.google.com/pdsb.net/twsstudentservices/student-services"
  );
  const loader3 = new CheerioWebBaseLoader(
    "https://en.wikipedia.org/wiki/The_Woodlands_School_(Mississauga)"
  );
  const loader4 = new CheerioWebBaseLoader(
    "https://sites.google.com/pdsb.net/twsstudentservices/important-links-and-info?authuser=0"
  );

  const siteDocs = await loader.load();
  const siteDocs2 = await loader2.load();
  const siteDocs3 = await loader3.load();
  // const siteDocs4 = await loader4.load();

  const concatDocs = siteDocs.concat(siteDocs2).concat(siteDocs3);
  // .concat(siteDocs4);

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 50,
  });

  const splittedDocs = await splitter.splitDocuments(concatDocs);

  // I want to return the splittedDocs to the frontend from here
  // so that I can use it in the chat/index.ts file

  res.status(200).json({ splittedDocs });
};

export default getSiteDocs;
