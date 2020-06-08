const Crawler = require("crawler")
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

var c = new Crawler({
    maxConnections: 1,
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            console.log($("title").text());
        }
        done();
    }
});

c.queue({
    uri: 'https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=bi3',

    // The global callback won't be called
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
            done();
            return
        }

        x = $(res.body)
        results = x.find("#search_results li").toArray()
        for (i in results) {
            r = $(results[i])

            console.log("Item", i)
            console.log("word", r.find(".word.trad:not(.active)>a").text().replace("Trad.", "").trim())
            console.log("word_trad", r.find(".word.trad>a").text().replace("Trad.", "").trim())

            console.log("\n\n")

        }
    }
})