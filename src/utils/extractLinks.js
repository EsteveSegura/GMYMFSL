const url = require('url')


function extractInstagram(arrVals) {
    let elements = arrVals.map((item) => {
        // ToDo : -add domains to every Social network
        // To avoid adding weir URLS
        // -Make smaller the if conditions via making and array
        // And pasing social networks as attirbute.
        if (item.includes('twitch') || item.includes('teespring') || item.includes('telegram') || item.includes('instagram') || item.includes('pinterest') || item.includes('reddit') || item.includes('snapchat') || item.includes('discord') || item.includes('vk') || item.includes('onylfans') || item.includes('tiktok') || item.includes('linkedin') || item.includes('patreon') || item.includes('twitter') || item.includes('facebook') && !item.includes('googleusercontent')) {
            let objUrl = !item.startsWith('http') ? new URL(`https://blalba.com${decodeURIComponent(item)}`) : new URL(decodeURIComponent(item))
            return objUrl.searchParams.get('q')
        }
    });

    let removeNullAndUndefined = elements.filter(el => { return el != null });
    let removeDuplicated = [...new Set(removeNullAndUndefined)];

    return removeDuplicated;
}

//Get all values of an obj by prop name
function findProp(obj, prop) {
    var result = [];
    function recursivelyFindProp(o, keyToBeFound) {
        Object.keys(o).forEach(function (key) {
            if (typeof o[key] === 'object') {
                recursivelyFindProp(o[key], keyToBeFound);
            } else {
                if (key === keyToBeFound) result.push(o[key]);
            }
        });
    }
    recursivelyFindProp(obj, prop);
    return result;
}


function extractLinks(obj) {
    let els = findProp(obj, 'url')
    let socialLinks = extractInstagram(els)
    return socialLinks
}

module.exports = { extractLinks }


/*SOCIAL NETWORKS
23snaps
8tracks.com
Academia.edu
About.me
alimero
Amikumu
aNobii
Anphabe.com
aSmallWorld
Athlinks
Band
beBee
BeWelcome
BigMuscle.com
Biip.no
BlackPlanet
Busuu
Buzznet
Care2
CaringBridge
CarSwap
Cellufun
Chess.com
Chictopia
Classmates.com
Cloob
CouchSurfing
CozyCot
Crunchyroll
Cucumbertown
Cyworld
DailyStrength
Dayviews
DeviantArt
Diaspora*
Discord
Draugiem.lv
douban
Doximity
Dreamwidth
DXY.cn
Ello
Elixio
English, baby!
eToro
Experience Project
Experts Exchange
Facebook
Faces
Fandalism
Fieldoo
Fitocracy
Fetlife
FictionCity
FilmAffinity
Filmow
Fishbrain
Flickchart
Flixster
Flickr
Focus.com
Fotki
Foursquare
Friendica
Fyuse
Gab.com
Gaia Online
Gapyear.com
Gays.com
Gaysir
Geni.com
Gentlemint
GetGlue
Goodreads
GovLoop
Grindr
Habbo
hi5
Hospitality Club
HR.com
Hub Culture
I Had Cancer
Ibibo
Identi.ca
İnci Sözlük
Indaba Music
Influenster
Inspire
IRC-Galleria
italki
JamiiForums
Kaixin001
KakaoStory
Kiwibox
KizlarSoruyor
Kroogi
Labroots
Last.fm
Letterboxd
LibraryThing
Likee
LinkedIn
Listography
LiveJournal
Mastodon
Mealshare.org
MeWe
Micro.blog
MocoSpace
MEETin
Meetup (website)
Minds
mixi
MocoSpace
MouthShut.com
Mubi
MyHeritage
Myspace
Nearby
NK.pl
Nexopia
Ning
Odnoklassniki
Open Diary
Parler
PatientsLikeMe
Partyflock
Peach
PEERtrainer
Pink Petro
Pinterest
Pixnet
Play.fm
Plaxo
Playlist.com
Plurk
Portfolium
Postcrossing
Quora
Qzone
RallyPoint
Ravelry
Readgeek
Reddit
Renren
ReverbNation.com
Rooster Teeth
Ryze
Sarahah
Sharesome
Sina Weibo
Skoob
Skyrock
Sonico.com
Snow
SoundCloud
Soup.io
Spaces
Spot.IM
Stage 32
Steam
StudiVZ
Tagged
Talenthouse
Taringa!
TermWiki
The Sphere
Thinkspot
Travellerspoint
Tuenti
Twitter
Twoo.com
Untappd
VK
Vampirefreaks.com
Viadeo
Vingle
Virb
Voat
Wattpad
Warm Showers
WAYN
We Heart It
Werkenntwen
Wooxie
WriteAPrisoner.com
WT Social
Wykop.pl
Xanga
XING
Yammer
Yelp
Yo
zoo.gr

*/