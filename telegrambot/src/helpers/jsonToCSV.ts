import { usersOutput } from "../constants/fileOutputNames";

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

type CSVWriterHeaderType = {
  id: string;
  title: string;
};

export const jsonToCSV = async ({
  data,
  headers,
}: {
  data: any[];
  headers: CSVWriterHeaderType[];
}) => {
  const csvWriter = createCsvWriter({
    path: `${usersOutput}.csv`,
    header: headers,
  });

  const file = await csvWriter.writeRecords(data);
};
