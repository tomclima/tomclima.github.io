module.exports = function(eleventyConfig) {
    // Tell Eleventy to copy your assets folder directly to the output (_site) folder
    eleventyConfig.addPassthroughCopy("assets");

    return {
        dir: {
            input: ".",         // Look in the root folder for pages/posts
            output: "_site"     // Spit out the finished website here
        }
    };
};