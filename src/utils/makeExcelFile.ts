import { Logger, excel } from "@helpers";
import * as fs from "fs";
import { promisify } from "util";

async function makeExcelFile(
  data: any,
  file_path_name: string
): Promise<{ buffer: Buffer; fileName: string }> {
  try {
    const filePath = `./uploads/${file_path_name}.xlsx`;

    const { WorkBook } = await excel.makeExcel(filePath, "Sheet1");

    const sheet = excel.addSheet(WorkBook, "Sheet1");

    const headers = Object.keys(data[0]);

    await excel.SheetWriter(sheet, headers, data);
    await excel.commitExcel(WorkBook);

    const readFileAsync = promisify(fs.readFile);

    const buffer = await readFileAsync(filePath);

    fs.unlinkSync(filePath);
    const fileName = `${new Date().toISOString().replace(/:/g, "-")}.xlsx`;
    return { buffer: buffer, fileName };
  } catch (error: any) {
    Logger.error(error.message, error);
    throw new Error(error.message);
  }
}

export default makeExcelFile;
