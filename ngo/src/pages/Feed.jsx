import { useState, useEffect } from 'react';
import dummyPosts from "../data/dummyposts";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [highlighted, setHighlighted] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate backend fetch
    setTimeout(() => {
      setPosts(dummyPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-6 bg-[#fdf6e3] min-h-screen">
        <br />
      <h2 className="text-4xl font-bold mb-8 text-[#005f73]">Community Feed</h2>

      {/* Skeleton Loader While Fetching */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-2xl shadow-md p-4">
              <div className="w-full h-56 skeleton rounded-xl mb-4"></div>
              <div className="w-3/4 h-4 skeleton rounded mb-2"></div>
              <div className="w-1/2 h-4 skeleton rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              onClick={() => setHighlighted(post)}
            >
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt="post"
                  className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2 text-[#0a9396]">{post.caption}</h4>
                <div className="text-sm text-gray-500">Posted {post.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Highlighted Post Modal */}
      {highlighted && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setHighlighted(null)}
        >
          <div
            className="bg-white rounded-xl overflow-hidden max-w-3xl w-full shadow-lg animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={highlighted.image}
              alt="highlighted"
              className="w-full object-cover max-h-[75vh]"
            />
            <div className="p-6">
              <h4 className="text-2xl font-bold mb-2 text-[#005f73]">{highlighted.caption}</h4>
              <p className="text-gray-500 text-sm">Posted {highlighted.timestamp}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
