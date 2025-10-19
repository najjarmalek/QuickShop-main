import React from 'react'
import { useAppContext } from "@/context/AppContext";

const SearchResults = ({ products, loading, searchQuery, onClearSearch }) => {
    const { currency, router } = useAppContext();

    // Function to handle product click
    const handleProductClick = (productId) => {
        router.push('/product/' + productId);
        scrollTo(0, 0);
    };

    if (loading) {
        return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
        );
    }

    return (
        <div>
        
        <div className="mb-4 flex justify-between items-center">
            <div className="text-gray-600">
            Found {products.length} product{products.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            </div>
            
            {searchQuery && (
            <button
                onClick={onClearSearch}
                className="text-sm text-blue-500 hover:text-blue-700 underline"
            >
                Clear search
            </button>
            )}
        </div>

        
        {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
                <div 
                    key={product._id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleProductClick(product._id)}
                >
                
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                 
                    {product.image ? (
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        className="h-full w-full object-cover"
                    />
                    
                    
                    ) : (
                    <span className="text-gray-500">No Image</span>
                    )}
                    
                </div>
                
                
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                    <p className="text-base font-medium">{currency}{product.offerPrice}</p>
                    <p className="text-sm text-gray-500 capitalize">
                        {product.category}
                    </p>
                    </div>
                    <button className="w-full mt-4 bg-orange-600 text-white py-2 rounded hover:bg-orange-400 transition-colors">
                    View Details
                    </button>
                </div>
                </div>
            ))}
            </div>
        ) : (
            
            <div className="text-center py-8">
            {searchQuery ? (
                <div>
                <p className="text-gray-500 text-lg mb-4">
                    No products found for "{searchQuery}"
                </p>
                <button
                    onClick={onClearSearch}
                    className="text-blue-500 hover:text-blue-700 underline"
                >
                    View all products
                </button>
                </div>
            ) : (
                <p className="text-gray-500 text-lg">No products available</p>
            )}
            </div>
        )}
        </div>
    );
};

export default SearchResults;