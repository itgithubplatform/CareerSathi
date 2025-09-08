export const getRecommendedJobs = async ([...params]: string[]) => {
  try {
    const jobs = await Promise.all(
      params
        .filter((param) => param && param !== "undefined")
        .map(async (param) => {
          const res = await fetch(
            `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${process.env.JOB_API_APP_ID}&app_key=${process.env.JOB_API_APP_KEY}&what=${param}&where=India&content-type=application/json`,
            { next: { revalidate: 86400 } }
          );

          if (!res.ok) throw new Error("Failed to fetch data");

          const data = await res.json();
          return data.results; 
        })
    );

    return jobs.flat();
  } catch (error) {
    throw error;
  }
};
