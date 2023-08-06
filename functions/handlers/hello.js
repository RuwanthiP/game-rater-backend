import connectDatabase from "../../database/dbConnect";

export const handler = async (event) => {
  await connectDatabase();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v3.0! Your function executed successfully! ",
      },
      null,
      2
    ),
  };
};
