import React, { useState, useEffect } from "react";

export const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState('');
  
  useEffect(() => {

    const fetchData = async () => {
      const items = [
        { id: 1, name: "Butter Chicken", time: "45 min", cuisine: "Indian", difficulty: "Medium", image: "public/1.jpg" },
        { id: 2, name: "Pad Thai", time: "30 min", cuisine: "Thai", difficulty: "Easy", image: "public/2.jpg" },
        { id: 3, name: "Mushroom Risotto", time: "50 min", cuisine: "Italian", difficulty: "Medium", image: "public/3.jpg" },
        { id: 4, name: "Noodles", time: "2 minutes", cuisine: "French", difficulty: "Hard", image: "public/4.jpg" },
        { id: 5, name: "Shakshuka", time: "25 min", cuisine: "Middle Eastern", difficulty: "Easy", image: "public/5.jpg" },
        { id: 6, name: "Pho", time: "2 hrs", cuisine: "Vietnamese", difficulty: "Medium", image: "public/6.jpg" },
        { id: 7, name: "Paella", time: "1 hr", cuisine: "Spanish", difficulty: "Medium", image: "public/7.jpg" },
        { id: 8, name: "Lamb Tagine", time: "2.5 hrs", cuisine: "Moroccan", difficulty: "Medium", image: "public/8.webp" },
        { id: 9, name: "Bibimbap", time: "40 min", cuisine: "Korean", difficulty: "Easy", image: "public/9.jpg" },
      ];
      setData(items);
    };
    
    fetchData();
  }, []);

 
  const filterData = data.filter((item) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );


  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filterData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filterData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

 
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (id) => {
    setCurrentPage(id);
  };


  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy": return "rgba(144, 238, 144, 0.3)";
      case "Medium": return "rgba(255, 255, 0, 0.2)";
      case "Hard": return "rgba(255, 165, 0, 0.3)";
      default: return "transparent";
    }
  };

  return (
    <div className="recipe-app" style={{
      backgroundImage: "url('public/10.avif')",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      position: "relative",
    }}>
      
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        zIndex: 0
      }}></div>
      
     
      <div style={{ position: "relative", zIndex: 1, padding: "20px" }}>
     
        <div className="hero-section" style={{ position: "relative", marginBottom: "50px" }}>
          <div className="quote-container" style={{ 
            position: "absolute", 
            top: "80px", 
            left: "40px", 
            maxWidth: "50%" 
          }}>
            <h1 style={{ fontSize: "38px", fontWeight: "bold", color: "#333" }}>
              "Cooking is like love. It should be entered into with abandon or not at all."
            </h1>
            <p style={{ fontSize: "24px", color: "#555" }}>- Harriet Van Horne</p>
          </div>
          
          <img 
            src="public/11.avif" 
            style={{ 
              display: "block", 
              marginLeft: "auto", 
              marginTop: "80px",
              maxWidth: "45%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }} 
            alt="Cooking" 
          />
        </div>

        
        <div className="search-container" style={{ textAlign: "center", margin: "20px 0" }}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            style={{
              padding: "10px 15px",
              width: "300px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              fontSize: "16px"
            }}
          />
        </div>

        {/* Recipe cards */}
        <div className="recipe-container" style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "center", 
          gap: "20px",
          padding: "20px" 
        }}>
          {records.map((item) => (
            <div className="recipe-card" key={item.id} style={{ 
              width: '260px', 
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
              backgroundColor: "#fff",
              transform: "scale(1)",
              "&:hover": {
                transform: "scale(1.03)"
              }
            }}>
              <img 
                src={item.image} 
                style={{ 
                  width: "100%", 
                  height: "200px", 
                  objectFit: "cover" 
                }} 
                alt={item.name} 
              />
              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>{item.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: "0", fontSize: "14px" }}><strong>{item.time}</strong></p>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "4px", 
                    backgroundColor: getDifficultyColor(item.difficulty),
                    fontSize: "12px"
                  }}>
                    {item.difficulty}
                  </span>
                </div>
                <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#666" }}>{item.cuisine}</p>
              </div>
            </div>
          ))}
        </div>

      
        {npage > 1 && (
          <nav style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}>
            <ul className="pagination" style={{ display: "flex", listStyle: "none", gap: "5px" }}>
              <li>
                <button 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                  style={{ 
                    padding: "8px 12px", 
                    borderRadius: "5px", 
                    border: "1px solid #ddd",
                    backgroundColor: currentPage === 1 ? "#f5f5f5" : "#fff",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer"
                  }}
                >
                  Prev
                </button>
              </li>
              
              {numbers.map((n) => (
                <li key={n}>
                  <button 
                    onClick={() => changePage(n)}
                    style={{ 
                      padding: "8px 12px", 
                      borderRadius: "5px", 
                      border: "1px solid #ddd",
                      backgroundColor: currentPage === n ? "#00cba9" : "#fff",
                      color: currentPage === n ? "#fff" : "#333",
                      cursor: "pointer"
                    }}
                  >
                    {n}
                  </button>
                </li>
              ))}
              
              <li>
                <button 
                  onClick={nextPage} 
                  disabled={currentPage === npage}
                  style={{ 
                    padding: "8px 12px", 
                    borderRadius: "5px", 
                    border: "1px solid #ddd",
                    backgroundColor: currentPage === npage ? "#f5f5f5" : "#fff",
                    cursor: currentPage === npage ? "not-allowed" : "pointer"
                  }}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
      
      
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1440 320" 
        style={{ marginTop: "30px", position: "relative", zIndex: 1 }}
      >
        <path 
          fill="#00cba9" 
          fillOpacity="1" 
          d="M0,96L60,128C120,160,240,224,360,240C480,256,600,224,720,197.3C840,171,960,149,1080,149.3C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};