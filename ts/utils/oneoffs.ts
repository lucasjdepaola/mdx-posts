/* the first ever group by with no mutations in typescript */
export const groupBy = (arr: any[], key: string) =>  // Lucas DePaola
    arr.reduce((pv, cv) => ({...pv, [cv[key]]: [...pv[cv[key]]||[], cv] || []}), {});