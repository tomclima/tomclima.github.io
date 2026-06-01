const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
    // Tell Eleventy to copy your assets folder directly to the output (_site) folder
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPassthroughCopy("assets");

    return {
        dir: {
            input: ".",         // Look in the root folder for pages/posts
            output: "_site"     // Spit out the finished website here
        },
        pathPrefix: "/your-repository-name/",
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk"
    };


};