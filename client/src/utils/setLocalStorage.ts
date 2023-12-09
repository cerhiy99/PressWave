
interface CategoryData {
    idCategories: number;
    count: number;
}
  
export const setCategory = (idCategories: number): void => {
    try {
      const categoriesLocalStorage = localStorage.getItem("categories");
      let newCategories: CategoryData[] = [];
  
      if (categoriesLocalStorage) {
        const parsedCategories: CategoryData[] = JSON.parse(categoriesLocalStorage);
        const existingCategoryIndex = parsedCategories.findIndex((category) => category.idCategories === idCategories);
  
        if (existingCategoryIndex !== -1) {
          parsedCategories[existingCategoryIndex].count += 1;
          newCategories = parsedCategories;
        } else {
          newCategories = [...parsedCategories, { idCategories, count: 1 }];
        }
      } else {
        newCategories = [{ idCategories, count: 1 }];
      }
  
      localStorage.setItem("categories", JSON.stringify(newCategories));
    } catch (error) {
      console.error("Error updating category in localStorage:", error);
    }
};

interface ArticleData {
    idArticles: number;
    count: number;
}
  
export const setViewedArticle = (idArticles: number): void => {
    try {
      const articlesLocalStorage = localStorage.getItem("viewedArticles");
      let newArticles: ArticleData[] = [];
  
      if (articlesLocalStorage) {
        const parsedArticles: ArticleData[] = JSON.parse(articlesLocalStorage);
        const existingArticleIndex = parsedArticles.findIndex((article) => article.idArticles === idArticles);
  
        if (existingArticleIndex !== -1) {
          parsedArticles[existingArticleIndex].count += 1;
          newArticles = parsedArticles;
        } else {
          newArticles = [...parsedArticles, { idArticles, count: 1 }];
        }
      } else {
        newArticles = [{ idArticles, count: 1 }];
      }
  
      localStorage.setItem("viewedArticles", JSON.stringify(newArticles));
    } catch (error) {
      console.error("Error updating viewed articles in localStorage:", error);
    }
};


export const getTopCategories = (limit: number): number[] | false => {
    try {
      const categoriesLocalStorage = localStorage.getItem("categories");
  
      if (categoriesLocalStorage) {
        const parsedCategories: CategoryData[] = JSON.parse(categoriesLocalStorage);
        const sortedCategories = parsedCategories.sort((a, b) => b.count - a.count);
        const topCategories = sortedCategories.slice(0, limit);
        const topCategoriesIds = topCategories.map((category) => category.idCategories);
  
        return topCategoriesIds;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error getting top categories from localStorage:", error);
      return false;
    }
  };
  
  export const getTopViewedArticles = (limit: number): number[] | false => {
    try {
      const articlesLocalStorage = localStorage.getItem("viewedArticles");
  
      if (articlesLocalStorage) {
        const parsedArticles: ArticleData[] = JSON.parse(articlesLocalStorage);
        const sortedArticles = parsedArticles.sort((a, b) => b.count - a.count);
        const topArticles = sortedArticles.slice(0, limit);
        const topArticlesIds = topArticles.map((article) => article.idArticles);
  
        return topArticlesIds;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error getting top viewed articles from localStorage:", error);
      return false;
    }
  };
  