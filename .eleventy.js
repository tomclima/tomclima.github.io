module.exports = function(eleventyConfig) {
    // Tell Eleventy to copy your assets folder directly to the output folder
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("components");

    return {
        dir: {
            input: ".",         // Look in the root folder for pages/posts
            output: "_site"     // Spit out the finished website here
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk"
    };
};