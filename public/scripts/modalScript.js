
function showModal(d)
{
    // 0 = type , 
    if(d[0])
    {
        document.getElementById("modal-title").innerHTML = "Our opinion on "+d[2]+" : "
        document.getElementById("modal-body").innerHTML = '<p>'+d[1]+'</p>'
    }
    else
    {
        document.getElementById("modal-title").innerHTML = "Features of "+d[2]+" : "
        document.getElementById("modal-body").innerHTML = ""
        for(let i = 0; i < d[1].length; i++)
        {
            document.getElementById("modal-body").innerHTML += '<div class="d-flex inline-flex"><i class="far fa-hand-point-right" style="vertical-align: middle;"></i><p class="ml-2">'+d[1][i]+'</p><br></div>'
        }
    }
    $('#modal').modal("toggle")
}

let coins = [
    "Bitcoin",
    "Ethereum",
    "Litecoin",
    "Cardano",
    "XRP",
    "Dogecoin"
]

let opinion = [
    "The price of the bitcoin record highs for a second day after Elon Musk’s car company Tesla had bought about $1.5 bn of the crypto currency.Recently an arm of Morgan Stanley has announced that it is considering to invest in crypto currency. Morgan Stanley is ready to invest $150 Billion in bitcoin. This news seems to be a bright future of crypto currencies specially the major one Bit coins. Future of crypto currency has also been predicted by JP Morgan Co- President Daniel Pinto. He said, he's 'sure' demand for bitcoin will pick up to the extent that the Wall Street giant will have to be involved.These two news are a positive sign for the crypto currency. There are so many other currency are circulating in the market but one has to be very careful about the Rules of government of that particular country who has denied the acceptance of trading and mining  a particular crypto currency.",
    "A  decentralize , open source blockchain crypto currency initially circulating in the market since 2015, Ethereum was launched and became the world's second most common option for crypto since it implemented the idea of a smart contract on top of blockchain technology.It is the second-largest crypto currency in terms of market capitalization after bit coin.It is funded by a very strong group and large corporations, and if you don't know then you should probably search Ethereum Enterprise Alliance.The year 2020 may have been the worst year for us, but it was a crypto-currency golden year. The year saw ETH offer 4.5x returns, Bitcoin testing and breaking its ATH. 2020 was the year that Bitcoin went mainstream with retail investors dipping their hands into crypto gold.",
    "Due to its relatively cheap rate, Litecoin is currently my favorite tool, and thus, please take my opinion on it, coming from someone who really believes in it.Some Key Points about Litecoin Litecoin has been around since 2011.Litecoin shares the deflationary nature of Bitcoin, and in a few years from now its supply will taper off. Litecoin, however, has a cap of 84million coins, 4 times higher than Bitcoin.Litecoin's block generation time is around 2 minutes to Bit coin’s 10 minutes. Therefore, it will undoubtedly be 4 times quicker than Bitcoin itself to speed up transactions on Litecoin. Because of this reason the list of merchants that accept Litcoin is growing rapidly.Over the next few years, Long Forecast, a group that uses mathematical and statistical measures to estimate the long-term success of investments, has a reasonably positive outlook for Litecoin.",
    "In today world, Cardano is among the top 10 listed crypto currency. Cardano is name of block chain technology and “ADA” is the digital asset of that blockchain.The long term growth potential of Cardano is sponsored by several partners. The latest technical studies, industry dynamics and analyst opinions indicate that for its investors, Cardano is a good investment option.",
    "Recently Jed sell sold a 95 million XRP Assets worth $56 million during the first week and on 14 th he sold 38 million XRP worth $22 million .This result in decline of price of ripple from the past 14 days .But the demand of ripple is growing as ripple is being incorporated into the banking system .As per my point of view Ripple is one of the biggest rivals of bitcoin. The XRP is a special digital currency of its kind. It acts as an instrument without a central exchange for the immediate conversion of any currency into another. The idea of Ripple is to make instant transactions in the entire financial sector.",
    "Dogecoin was launched in the year 2013 by two developer Jackson Palmar and Billy Markus to make crypto currency more fun and amazing.It is well regarded as a community coin and has raised good funds for charities such as charities in the past Dogecoin community.The Dogecoin Group raised USD 50,000 to send the Jamaican team to the Winter Olympics."
]

let features = [
    [
        "Greater Liquidity Relative to Other Cryptocurrencies",
        "Increasingly Wide Acceptance as a Payment Method",
        "International Transactions Easier Than Regular Currencies",
        "Generally Lower Transaction Fees",
        "Anonymity and Privacy Relative to Traditional Currencies"
    ],
    [
        "Well-known founder and an expanding developer community",
        "Ethereum is decentralised",
        "Ethereum is more than a cryptocurrency",
        "Ethereum is attracting more businesses",
        "Ether is not capped"
    ],
    [
        "Litecoin is an open-source network",
        "Litecoin is decentralised",
        "Litecoin is fast & scalable",
        "Low transactions fees",
        "Litecoin has been improving regularly since it was launched"
    ],
    [
        "Open-Source Code",
        "A Credible Team",
        "Energy efficient consensus protocol",
        "Double Layered Character"
    ],
    [
        "It's Affordable",
        "It solves problems and creates opportunities",
        "Market Cap of Ripple",
        "Ripple isn't just another cryptocurrency"
    ],
    [
        "Faster confirmation times",
        "Lower transaction fees",
        "Lower value which helps in tipping and gaming currency",
        "Friendly community"
    ]
]

let headingSrc = [
    "./data/newBG/Bitcoin.svg",
    "./data/newBG/Ethereum.svg",
    "./data/newBG/Litecoin.svg",
    "./data/newBG/Cardano.svg",
    "./data/newBG/XRP.svg",
    "./data/newBG/Dogecoin.svg"
]

let coinSrc = [
    "./data/bitcoin.jpg",
    "./data/Ethereum.jpg",
    "./data/litecoin.jpg",
    "./data/Cardano.jpg",
    "./data/xrp.jpg",
    "./data/doge.jpg",
]

// let coinDetails = [
//     "Bitcoin is a digital currency that was created in January 2009.Bitcoin offers the promise of lower transaction fees.",
//     "Ethereum is a digital currency.It's a community-built technology behind the cryptocurrency ether (ETH).",
//     "Litecoin is increasingly used in the same breath as Bitcoin, and it functions practically the same way.",
//     "Cardano is a decentralized public blockchain and cryptocurrency project and is fully open source.",
//     "XRP is a digital asset built for payments. It is the native digital asset on the XRP Ledger—an open-source, permissionless and decentralized.",
//     "Dogecoin is a cryptocurrency invented by software engineers Billy Markus and Jackson Palmer, who decided to create a payment system that is instant, fun, and low fee"
// ]

let coinDetails = [
    "It was introduced by Santoshi Nakamoto in 2009. Digital currencies that are decentralize without Central Bank. Bitcoin is used to send money to someone like how normal currency works and it can only be manual. Bitcoin transaction process is slow, it can take 10 minutes to complete a transaction",
    "While Ether currency is accepted only in Ethereum Network. It was launched by Vitalik Buterin in 2015.Ethereum is used only within the Ethereum Network. Though it can be used in Real-time transactions. It can be manual as well as automatic. Ether is going to be continous and but this also not expected to extend by 100 Million.",
    "Created by Charlie Lee, It was released in 2011. It has limited supply of 84 Million only. Its blog creation time is 2.5 mins as compared to Bitcoin which is 10 mins. It is Accepted by many merchants world wide and total number of Litecoins supply is around 65 Million.",
    "It is launched in September 2017, by Charles Hoskinson , it is build around Peer Reviewed Papers. It is better and improved Version of Bitcoin and Ethereum. Since it is based on Proof of Stake, transaction cost is very low. One of the most potential type of crypto currency which is likely to grow",
    "It is introduced by Chris Larsen and Jed MC Caleb in 2013.Where Bitcoin transaction takes time, XRP takes only 4 seconds to complete a transaction. It is created so that Centralised Banks can also use it.It has also collaborated with Bank of America and American Express to transfer currency from one country to another.",
    "It was launched in 2013 by Jackson Palmer with the help of Billy Markus who is an IBM Software Engineer. In the starting of 2017, its market value raised by $20 million which reached at $2 Billion by the end of the year. Reason behind its popularity in Elon Musk as he kept on talking about it on Twitter and Second is Reddit."
]

function loaded2()
{
    let o = {1:"Bitcoins", 2:"Ethereums", 3:"Litecoins", 4:"Cardanos", 5:"XRPs", 6:"Dogecoins"}
    for(let i = 0; i < 6; i++)
    {
        // document.getElementById("opinion"+i).onclick = ()=>{
        //     showModal([true, opinion[i], coins[i]])
        // }
        // document.getElementById("features"+i).onclick = ()=>{
        //     showModal([false, features[i], coins[i]])
        // }
        document.getElementById("banner2"+i).onclick = ()=>{
            //document.getElementById("coinDetailsBox").style.display = "none"
            document.getElementById("features").innerHTML = ""
            document.getElementById("opinion").innerHTML = ""
            document.getElementById("number").innerHTML = "#"+(i+1)
            document.getElementById("title").setAttribute("src", headingSrc[i])
            document.getElementById("coinImg").setAttribute("src", coinSrc[i])
            document.getElementById("coinDetail").innerHTML = coinDetails[i]
            document.getElementById("prediction").onclick = ()=>{
                location.href = "/"+o[document.getElementById("number").innerHTML.slice(-1)]
            }
            document.getElementById("opinion0").onclick = ()=>{
                document.getElementById("features").innerHTML = ""
                document.getElementById("opinion").innerHTML = opinion[i]
            }
            document.getElementById("features0").onclick = ()=>{
                document.getElementById("features").innerHTML = ""
                document.getElementById("opinion").innerHTML = ""
                for(let j = 0; j < features[i].length; j++)
                {
                    document.getElementById("features").innerHTML += '<div class="d-flex inline-flex"><i class="far fa-hand-point-right" style="vertical-align: middle;"></i><p class="ml-2">'+features[i][j]+'</p><br></div>'
                }                
            }
            //document.getElementById("opinion").setAttribute("id", "opinion"+i)
            document.getElementById("coinDetailsBox").style.display = "block"
        }
    }
}

function first(d){
    document.getElementById("features").innerHTML = ""
    document.getElementById("opinion").innerHTML = ""
    if(d == 0)
    {
        for(let j = 0; j < features[0].length; j++)
        {
            document.getElementById("features").innerHTML += '<div class="d-flex inline-flex"><i class="far fa-hand-point-right" style="vertical-align: middle;"></i><p class="ml-2">'+features[0][j]+'</p><br></div>'
        }
    }
    else
        document.getElementById("opinion").innerHTML = opinion[0]
}
