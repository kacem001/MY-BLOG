
const articles = [
    {
        id: 1,
        title: "The Steady of Nature Technology and the Future",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        content: "Technology continues to evolve at a rapid pace, transforming how we interact with the world around us. From artificial intelligence to renewable energy solutions, innovations are shaping our future in profound ways.\n\nAs we embrace these technological advancements, it's crucial to consider their environmental impact and ensure sustainable development. The balance between progress and preservation remains a key challenge of our time.\n\nThe integration of technology with natural systems offers promising solutions to some of our most pressing problems. Biomimicry, for instance, draws inspiration from nature to create more efficient and sustainable designs.\n\nLooking ahead, the fusion of human creativity with technological capabilities will likely lead to unprecedented breakthroughs in fields ranging from medicine to space exploration.",
        tags: ["a", "b"]
    },
    {
        id: 2,
        title: "Travel & Adventure",
        image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        content: "Traveling opens our minds to new perspectives and cultures, enriching our understanding of the world. Each journey presents unique opportunities for discovery and growth.\n\nFrom bustling cities to serene natural landscapes, every destination offers valuable lessons and memorable experiences. The challenge of adapting to different environments develops resilience and flexibility.\n\nCultural immersion allows us to appreciate diversity and find common ground with people from various backgrounds. These connections often lead to lasting friendships and broader worldviews.\n\nAdventure travel pushes us beyond our comfort zones, revealing strengths we didn't know we had. The sense of accomplishment after overcoming obstacles is one of the most rewarding aspects of exploration.",
        tags: ["c", "b"]
    },
    {
        id: 3,
        title: "The Future of Work",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        content: "The workplace is undergoing a transformation driven by technology, globalization, and changing workforce demographics. Remote work, flexible schedules, and digital collaboration tools are becoming the norm.\n\nAs organizations adapt to these changes, they must prioritize employee well-being and engagement. A positive work culture fosters creativity and innovation, leading to better outcomes for both employees and employers.\n\nUpskilling and reskilling are essential for staying competitive in the evolving job market. Lifelong learning will be crucial as industries continue to change rapidly.\n\nDiversity and inclusion are also key components of the future workplace. Embracing different perspectives enhances problem-solving and drives innovation.",
        tags: ["a"]
    }
    ,
    {
        id: 4,
        title: "The Power of Mindfulness",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        content: "Mindfulness is the practice of being present and fully engaged in the moment. It encourages us to observe our thoughts and feelings without judgment, fostering a deeper connection with ourselves and our surroundings.\n\nIn today's fast-paced world, mindfulness offers a refuge from stress and distraction. Regular practice can lead to improved mental clarity, emotional regulation, and overall well-being.\n\nIncorporating mindfulness into daily routines can be as simple as taking a few deep breaths or practicing gratitude. These small changes can have a profound impact on our quality of life.\n\nAs we cultivate mindfulness, we become more attuned to our inner selves and the world around us, enhancing our relationships and enriching our experiences.",
        tags: ["b", "c"]
    }

];

// Function to get all articles or filter by topic if provided
function getArticles(topic) {
    if (!topic) {
        return articles;
    }

    // Filter articles by topic (case-insensitive partial match)
    return articles.filter(article =>
        article.title.toLowerCase().includes(topic.toLowerCase()) ||
        article.content.toLowerCase().includes(topic.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(topic.toLowerCase()))
    );
}

module.exports = getArticles;