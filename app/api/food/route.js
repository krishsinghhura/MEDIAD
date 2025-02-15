// import axios from "axios";
// import { NextResponse } from "next/server";

// const CLIENT_ID = "9b23404924154a5493b26ee2679d277d";
// const CLIENT_SECRET = "ea5a3315cc9f4b89a5347d087d5f00f3";

// // Function to get access token from FatSecret
// const getAccessToken = async () => {
//     try {
//         const response = await axios.post(
//             "https://oauth.fatsecret.com/connect/token",
//             new URLSearchParams({
//                 grant_type: "client_credentials",
//                 scope: "basic",
//             }),
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                     Authorization:
//                         "Basic " + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
//                 },
//             }
//         );
//         return response.data.access_token;
//     } catch (error) {
//         console.error("Error getting access token:", error.response?.data || error.message);
//         return null;
//     }
// };

// export async function GET(req, res) {
//     const { food } = await req.json();

//     if (!food) {
//         return NextResponse.json({ message: 'Food not present' });
//     }

//     try {
//         const token = await getAccessToken();
//         if (!token) {
//             return NextResponse.json({ message: "Acces not provided" });
//         }

//         const response = await axios.post("https://platform.fatsecret.com/rest/server.api",
//             new URLSearchParams({
//                 method: "foods.search",
//                 format: "json",
//                 search_expression: food,
//             }),
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                     Authorization: `Bearer ${token}`,
//                 },
//             },

//         )
//         return NextResponse.json(response.data);
//     }
//     catch (error) {
//         console.error("Error fetching food data:", error.response?.data || error.message);
//         res.status(500).json({ error: "Failed to fetch food data" });
//     }
// }