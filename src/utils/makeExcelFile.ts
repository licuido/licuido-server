import { Logger, excel, streamToBuffer } from "@helpers";
import * as fs from "fs";
const path = require("path");

async function makeExcelFile(
  data: any,
  file_path_name: string
): Promise<{ buffer: Buffer; fileName: string }> {
  try {
    console.log("========================================================");
    console.log(__dirname);
    console.log(file_path_name);
    console.log("========================================================");
    const filePath = path.resolve(
      __dirname,
      `./../uploads/${file_path_name}.xlsx`
    );
    console.log(filePath);

    const { WorkBook } = await excel.makeExcel(filePath, "Sheet1");

    const sheet = excel.addSheet(WorkBook, "Sheet1");

    const headers = Object.keys(data[0]);

    await excel.SheetWriter(sheet, headers, data);
    await excel.commitExcel(WorkBook);

    // const readFileAsync = promisify(fs.readFile);

    const buffer = await streamToBuffer.streamToBufferAsync(
      fs.createReadStream(filePath)
    );
    console.log("========================================================");
    console.log(filePath);
    console.log("========================================================");
    fs.unlinkSync(filePath);
    const fileName = `${new Date().toISOString().replace(/:/g, "-")}.xlsx`;

    return { buffer: buffer, fileName };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw new Error(error.message);
  }
}

export default makeExcelFile;
