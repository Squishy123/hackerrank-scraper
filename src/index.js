const axios = require('axios').default

const SKILLS = [
    "algorithms",
    "data-structures",
    "mathematics",
    "c",
    "cpp",
    "java",
    "python",
    "ruby",
    "shell",
    "fp",
    "ai",
    "sql",
    "databases",
    "regex"
]

// req gets list of challenges
const CHALLENGE_URL_TEMPLATE = (skillName, offset = 0, limit = 100) => (`https://www.hackerrank.com/rest/contests/master/tracks/${skillName}/challenges?offset=${offset}&limit=${limit}`)


async function scrapeSkill(skillName, csrf, cookie) {
    try {
        const instance = axios.create({
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "sec-fetch-site": "same-origin",
                "sec-fetch-mode": "cors",
                "sec-fetch-dest": "empty",
                'x-csrf-token': csrf,
                'cookie': cookie,
                'user-agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36"
            }
        })


        let res = await instance.get(CHALLENGE_URL_TEMPLATE(skillName)).then(res => res.data)

        let total = res.total
        console.log(res)
    } catch (err) {
        console.error(err)
    }
}

(async () => {
    scrapeSkill("algorithms",
        "doRq4Td+8iwhiq4UOPI4PNUVWH0JnJN6Xgdn3N1HfAUMr5mnNQsNVojCw7Hq5+PdVMbTMryMfKmtXjh3JrwWgg==",
        "user_type=hacker; h_l=body_middle_left_button; hackerrank_mixpanel_token=a6b41aea-630c-41c8-9815-d66790ec3c03; fileDownload=true; h_r=next-challenge%26next-challenge; h_l=_default; h_v=zen%26zen; h_r=[%22next-challenge%22%2C%22next-challenge%22%2C%22next-challenge%22%2C%22next-challenge%22]; h_v=[%22zen%22%2C%22zen%22%2C%22zen%22%2C%22zen%22]; hrc_l_i=F; _hrank_session=909feb9c97d3174037ece473d15c5a81c280e52b6c4166c15ca4f57ec8d8ebb94c6f236bc86143b8f3d7620aa7d43de318ece1cd4513f9cafd9bacc8496fb1a9; session_id=f1ushp85-1618939913623")
})()
