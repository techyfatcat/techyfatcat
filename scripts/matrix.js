const fs = require("fs");

const USERNAME = "techyfatcat";

const TOKEN = process.env.GH_TOKEN;

if (!TOKEN) {
    throw new Error("GH_TOKEN secret not found.");
}

const WIDTH = 1200;
const HEIGHT = 400;

const GRAPHQL_URL = "https://api.github.com/graphql";

const QUERY = `
query($login:String!){

  user(login:$login){

    repositories{
      totalCount
    }

    followers{
      totalCount
    }

    contributionsCollection{

      contributionCalendar{

        totalContributions

        months{
          name
          year
          firstDay
          totalWeeks
        }

        weeks{

          contributionDays{

            contributionCount

            contributionLevel

            date

            weekday

            color

          }

        }

      }

    }

  }

}
`;

async function githubQuery(){

    const response = await fetch(GRAPHQL_URL,{
        method:"POST",

        headers:{
            "Authorization":`Bearer ${TOKEN}`,
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            query:QUERY,

            variables:{
                login:USERNAME
            }

        })

    });

    if(!response.ok){

        throw new Error(
            `GitHub API Error ${response.status}`
        );

    }

    const json = await response.json();

    if(json.errors){

        console.log(json.errors);

        throw new Error("GraphQL query failed.");

    }

    return json.data.user;

}

async function main(){

    console.log("Fetching GitHub data...");

    const user = await githubQuery();

    const calendar =
        user.contributionsCollection.contributionCalendar;

    console.log(
        "Repositories:",
        user.repositories.totalCount
    );

    console.log(
        "Followers:",
        user.followers.totalCount
    );

    console.log(
        "Total Contributions:",
        calendar.totalContributions
    );

    console.log(
        "Months:",
        calendar.months.length
    );

    console.log(
        "Weeks:",
        calendar.weeks.length
    );

}

main().catch(err=>{

    console.error(err);

    process.exit(1);

});
