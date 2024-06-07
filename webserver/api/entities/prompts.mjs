export const init = async (sql) => {
  await sql(
    `CREATE TABLE IF NOT EXISTS "Prompts"(
          "PromptId" VARCHAR(190) NOT NULL,
          "UserName" VARCHAR(190) NOT NULL,
          "Status" VARCHAR(190) NOT NULL,
          "Rating" TINYINT NULL,
          "Input" JSON NULL,
          "Output" JSON NULL,
          PRIMARY KEY("PromptId")
        );`,
    true,
  );
};
