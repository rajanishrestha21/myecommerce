import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { error } from "console";

export async function getMyOrders(userId: string) {
    if(!userId) {
        throw new Error("User ID is required");
    }
//define the query to get the orders based on userId ,sorted by orderDate descending
  const MY_ORDERS_QUERY = defineQuery(`
   *[_type == "order"&& clerkUserId == $userId] | order(orderDate desc) {
    ...,
    products[]{
        ...,
        product->
    }
   }
      `);
      try{
        //use sanityFetch to send the query
      const orders =await sanityFetch ({
        query:MY_ORDERS_QUERY,
        params: {userId},
      } );
      //Return the list of order or an empty array if none are found
      return orders.data || [];
    } catch (error) {
        console.error("Error fetching orders:",error);
        throw new Error("Error fetching orders");
    }

      }