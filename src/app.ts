import csv from "csvtojson";
import { sha256 } from "js-sha256";
import fs from "fs";
import { parseAsync } from "json2csv";

const filePath = process.argv[2] || "HNG9.csv";

async function csvcon(csvFilePath: string) {
  if (!csvFilePath) {
    return console.log("FilePath is Invalid");
  }
  const jsonArray = await csv().fromFile(csvFilePath);
  const newJsonArr = jsonArray.map((record) => {
    const sha256_for_each_row = sha256(record.UUID);
    return {
      ...record,
      hash: sha256_for_each_row,
    };
  });

  const CSV_OUTPUT = `${csvFilePath.split(".")[0]}.output.csv`;
  // create csv string
  const csvOutput = await parseAsync(newJsonArr);

  // write csv string to file
  fs.writeFile(CSV_OUTPUT, csvOutput, { encoding: "utf8" }, (err2: any) => {
    if (err2) {
      console.error("Error occurred: ", err2);
      return;
    }

    console.log(
      `New CSV file generated and uploaded to the file path ${__dirname}\\${CSV_OUTPUT}`
    );
  });
}

csvcon(filePath);
