import { env } from "../config/env";

export interface Question {
  question_id: number;
  title: string;
  body: string;
  link: string;
  creation_date: number;
}

export async function fetchLatestQuestions(): Promise<Question[]> {
  const params = new URLSearchParams({
    site: "stackoverflow",
    tagged: env.TAG_TO_MONITOR,
    sort: "creation",
    order: "desc",
    pagesize: "10",
    filter: "withbody",
  });

  if (env.STACKEXCHANGE_KEY) {
    params.append("key", env.STACKEXCHANGE_KEY)
  };

  const url = `https://api.stackexchange.com/2.3/questions?${params}`;
  const res = await fetch(url);
  const json = await res.json();
  return json.items as Question[];
}
