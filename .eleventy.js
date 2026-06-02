module.exports = function(eleventyConfig) {
    // 1. Existing Assets Passthroughs
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("components");

    // 2. FIXED: Map the "posts" directory to the "_site/posts" directory explicitly
    // This tells Eleventy: "Take everything in posts/ and clone its exact layout structure over"
    eleventyConfig.addPassthroughCopy({ "posts": "posts" });

    return {
        dir: {
            input: ".",         // Look in the root folder for pages/posts
            output: "_site"     // Spit out the finished website here
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};