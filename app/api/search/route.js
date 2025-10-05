import connectDB from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';

        let products;
        
        if (query) {
            
            products = await Product.find({
                name: { $regex: query, $options: 'i' }
            });
        } else {
            
            products = await Product.find({});
        }

        return NextResponse.json({
            success: true,
            products,
            searchQuery: query,
            resultsCount: products.length
        });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}