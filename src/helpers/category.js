data={
    "fruits":["apple","banana","orange","mango","grapes","pineapple","pomegranate","avocado","papaya","watermelon","dragonfruit","strawberry","blueberry","blackberry","jackfruit","egg fruit","acai berry","apricot","banana","cherry","custard apple","plum","grapefruit","guava","mulberry","monk fruit","pear","lemon","kiwi","","","","","","","","","",""],
    "vegetable":["potato","tomato","cucumber","garlic","pumpkin","beet","turnip","radish","pepper","carrot","onion","cabbage","pea","eggplant","corn","green bean","mushroom","","","","","","","","","","","","","","","","","","","","","",""],
    "stationary":["note book","pen","pencil","scale","papper","refiller","ink","eraser","sharpener","cello tape","brown tape","highlighter","papper cutter","pin packet","papper pin","scissors","thread","bangles","necklace","candy","soap","oil","toy","gift papper","chart papper","sketch pen","drawing book","face wash","shampoo","conditioner","body lotion","cream","hair clip","hair band","bush","gift items","gift papper","body wash","bulb"],
    "bakery":["cake","biscuits","bread","cookies","milk","tank","curd","dates","jam","juice","snacks","honey","ice cream","candy","","","","","","","","","","","","","","","","","","","","","","","","",""],
    "supermarket":["bread","milk ","curd","broom","bucket","cup","candy","ice cream","dates ","jam","snacks","honey","curry powders","pulses","cosmetic items","rice","toys","book items","soap","body care items","baking items","","","","","","","","","","","","","","","","","",""],
    "shoes":["chuck taylor","golf shoes","hiking boots","high-tops","running shoes","climbing shoes","soccer shoes","sneakers (u.s)/ trainers (u.k)","old skool","basketball shoes","ice-skates","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
    "bags":["hand bag","duffle bag","messenger bag","backpack","hobo bag","tote bag","satchel","doctor’s bag","laptop bag","bucket bag","bowler bag"," wristlet","pouch","clutch","beach bag","shoulder bag","18. miniaudiere","19. shopping/grocery bag","20. drawstring bag","21. make up bags","22. foldover bags","23. phone bag","24. camera case bags","baguette bags","barrel bag","basket bag","fanny pack"," kelly bag","lunch bags","","","","",".","","","","",""],
    "textiles":["shirts","pants","shorts","frocks","saree","churidar","skirt","top","t-shirt","jeans","shoes","coat","high heels","suit","cap","socks","sweater","bra","scarf","swimsuit","hat","gloves","jacket","long coat","","sunglasses","tie","polo shirt","leather jacket","","","","","","","","","",""],
    "furniture":["sofa","bed","chair","chest of drawers","table","desk","bookshelf","nightstand","wardrobe","coffee table","armchair","stool","cabinet","cupboard","dinning table","bench","cot","lamps","mattress","office chair","","","","","","","","","","","","","","","","","","",""],
    "electronicshope":["washing machine","oven","refrigerator","blender","toast machine","kettle","iron","vaccum cleaner","microwave","mixer","electric fan","pressure cooker","television","coffee machine","air conditioner","speaker","dishwasher","water purifier","rice cooker","","","","","","","","","","","","","","","","","","","",""],
    "fancystore":["lipstick","mascara","foundation","concealer","eyeliner","primer","blush","eyeshadow","bronzer","lipliner","highlighter","lip gloss","lip balm","kajal","face powder","makeup brush","setting spray","eyebrow pencil","makeup remover","bb cream","powder","eyelash curler","","","","","","","","","","","","","","","","",""]
  }
// funtion to an element prsent in in dictionary    
function isPresent(element,dict)
{
    for(var key in dict)
    {
        if(dict[key].includes(element.toLowerCase()))
        {console.log(key);
            return key;
        }
    }

    return element;
}

exports.parseCategoryData = function(key) {
    return isPresent(key,data);};