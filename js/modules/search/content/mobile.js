console.log("modules/search/content/mobile.js");
import {search} from '../manifest.js';
search.mobile = [
	//google
    {
        name: "googleSearchResult",
		url_match: "*://www.google.com/search?*",
        description: "This item collects Google search results, search category, page number and corresponding search query",
		viewGroup: "Google",
        title: "Search Result",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: "window",
                event_name: "load"
            }
        ],
        objects: [
            {
                selector:".ZINbbc.xpd.O9g5cc.uUPGi",
				conditions: [[{type: 'child', contain: true, val: ".x54gtf"}, {type: 'ancestor', contain: false, val: ".Z8j5ae"}]],
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".kCrYT a .BNeawe.UPmit.AP7Wnd",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".kCrYT a .BNeawe.vvjwJb.AP7Wnd",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".kCrYT .BNeawe.s3v9rd.AP7Wnd",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".ZINbbc.xpd.O9g5cc.uUPGi",
				name: "adsResult",
				conditions: [[{type: 'child', contain: true, val: ".BUybKe"}]],
				indexName: "rank",
                properties: [
                    {
                        selector: "a .zbELhe.MUxGbd.lyLwlc.aLF0Z .qzEoUe",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: "a .MUxGbd.v0nnCb",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".BmP5tf .MUxGbd.yDYNvb",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "input.noHIxc",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".ZINbbc.xpd.O9g5cc.uUPGi.BmP5tf .SAez4c",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    },
					{
                        selector: ".Pg70bf span",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
    {
        name: "googleClickedLink",
		url_match: "*://www.google.com/search?*",
        description: "This item collects links clicked by user from Google search result",
		viewGroup: "Google",
        title: "Clicked link",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".ZINbbc.xpd.O9g5cc.uUPGi",
				conditions: [[{type: 'child', contain: true, val: ".x54gtf"}, {type: 'ancestor', contain: false, val: ".Z8j5ae"}]],
                event_name: "click"
            },
			{
                selector: ".ZINbbc.xpd.O9g5cc.uUPGi",
				conditions: [[{type: 'child', contain: true, val: ".x54gtf"}, {type: 'ancestor', contain: false, val: ".Z8j5ae"}]],
				event_name: "contextmenu"
            }
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },
            {
                selector:"", 
                properties: [
                    {
                        selector: ".kCrYT a .BNeawe.UPmit.AP7Wnd",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".kCrYT a .BNeawe.vvjwJb.AP7Wnd",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }                 
                ]
            },
			{
                selector:".ZINbbc.xpd.O9g5cc.uUPGi",
				conditions: [[{type: 'child', contain: true, val: ".x54gtf"}, {type: 'ancestor', contain: false, val: ".Z8j5ae"}]],
                name: "searchResult",				
				indexName: "rank",
                properties: [
                    {
                        selector: ".kCrYT a .BNeawe.UPmit.AP7Wnd",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".kCrYT a .BNeawe.vvjwJb.AP7Wnd",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".kCrYT .BNeawe.s3v9rd.AP7Wnd",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".ZINbbc.xpd.O9g5cc.uUPGi",
                name: "adsResult",
				conditions: [[{type: 'child', contain: true, val: ".BUybKe"}]],
				indexName: "rank",
                properties: [
                    {
                        selector: "a .zbELhe.MUxGbd.lyLwlc.aLF0Z .qzEoUe",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: "a .MUxGbd.v0nnCb",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".BmP5tf .MUxGbd.yDYNvb",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "input.noHIxc",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".ZINbbc.xpd.O9g5cc.uUPGi.BmP5tf .SAez4c",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    },
					{
                        selector: ".Pg70bf span",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
	{
        name: "googleAdsClickedLink",
		url_match: "*://www.google.com/search?*",
        description: "This item collects advertising links clicked by user from Google search result",
		viewGroup: "Google",
        title: "Ads clicked link",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".ZINbbc.xpd.O9g5cc.uUPGi",
				conditions: [[{type: 'child', contain: true, val: ".BUybKe"}]],
                event_name: "click"
            },
			{
                selector: ".ZINbbc.xpd.O9g5cc.uUPGi",
				conditions: [[{type: 'child', contain: true, val: ".BUybKe"}]],
                event_name: "contextmenu"
            }
        ],
        objects: [			
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },
            {
                selector:"",
                properties: [
                    {
                        selector: "a .zbELhe.MUxGbd.lyLwlc.aLF0Z .qzEoUe",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: "a .MUxGbd.v0nnCb",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".BmP5tf .MUxGbd.yDYNvb",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".ZINbbc.xpd.O9g5cc.uUPGi",
                name: "searchResult",
				conditions: [[{type: 'child', contain: true, val: ".x54gtf"}, {type: 'ancestor', contain: false, val: ".Z8j5ae"}]],
				indexName: "rank",
                properties: [
                    {
                        selector: ".kCrYT a .BNeawe.UPmit.AP7Wnd",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".kCrYT a .BNeawe.vvjwJb.AP7Wnd",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".kCrYT .BNeawe.s3v9rd.AP7Wnd",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".ZINbbc.xpd.O9g5cc.uUPGi",
                name: "adsResult",
				conditions: [[{type: 'child', contain: true, val: ".BUybKe"}]],
				indexName: "rank",
                properties: [
                    {
                        selector: "a .zbELhe.MUxGbd.lyLwlc.aLF0Z .qzEoUe",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: "a .MUxGbd.v0nnCb",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".BmP5tf .MUxGbd.yDYNvb",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "input.noHIxc",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".ZINbbc.xpd.O9g5cc.uUPGi.BmP5tf .SAez4c",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    },
					{
                        selector: ".Pg70bf span",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]		
	},
	//bing
	{
        name: "bingSearchResult",
		url_match: "*://www.bing.com/*",
        description: "This item collects Bing search results, search category, page number and corresponding search query",
		viewGroup: "Bing",
        title: "Search Result",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: "window",
                event_name: "load"
            }
        ],
        objects: [
			{				
                selector:"#b_results .b_algo",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: "a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: "a h2",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".b_caption p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:"#b_results .b_ad .ad_sc",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".b_attribution .b_adurl cite",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: "a h2",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".b_caption p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#sb_form_q",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".b_pag .b_lipgSpan .sb_pagS",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    },
					{
                        selector: ".b_active",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
    {
        name: "bingClickedLink",
		url_match: "*://www.bing.com/*",
        description: "This item collects links clicked by user from Bing search result",
		viewGroup: "Bing",
        title: "clicked link",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".b_algo h2",
                event_name: "click"
            },
			{
                selector: ".b_algo a",
                event_name: "contextmenu"
            }
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },		
            {
                selector:"",
                properties: [
                    {						
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
						selector:"h2",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{				
                selector:"#b_results .b_algo",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: "a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: "a h2",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".b_caption p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:"#b_results .b_ad .ad_sc",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".b_attribution .b_adurl cite",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: "a h2",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".b_caption p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#sb_form_q",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".b_pag .b_lipgSpan .sb_pagS",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    },
					{
                        selector: ".b_active",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
	{
        name: "bingAdsClickedLink",
		url_match: "*://www.bing.com/*",
        description: "This item collects Ads links clicked by user from Bing search result",
		viewGroup: "Bing",
        title: "Ads clicked link",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".b_ad .ad_sc",
                event_name: "click"
            },
			{
                selector: ".b_ad .ad_sc",
                event_name: "contextmenu"
            }
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },		
            {
                selector:"",
                properties: [
                    {
						selector:".b_attribution .b_adurl cite",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
						selector:"a h2",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{				
                selector:"#b_results .b_algo",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: "a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: "a h2",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".b_caption p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:"#b_results .b_ad .ad_sc",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".b_attribution .b_adurl cite",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: "a h2",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".b_caption p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#sb_form_q",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".b_pag .b_lipgSpan .sb_pagS",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    },
					{
                        selector: ".b_active",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
	//yahoo
	{
        name: "yahooSearchResult",
		url_match: "*://*.yahoo.com/*",
        description: "This item collects Yahoo search results, search category, page number and corresponding search query",
		viewGroup: "Yahoo",
        title: "Search Result",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: "window",
                event_name: "load"
            }
        ],
        objects: [
            {
                selector:".algo",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compTitle div span",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".title",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".AdsCard",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compText.tad-url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-abst",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#p",
                        property: "value",
                        name: "query",
                        type: "text"
                    },                    
					{
                        selector: ".tab.selected .tab-wrapper",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
    {
        name: "yahooClickedLink",
		url_match: "*://*.yahoo.com/*",
        description: "This item collects links clicked by user from Yahoo search result",
		viewGroup: "Yahoo",
        title: "clicked link",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".algo .compTitle",
                event_name: "click"
			},
			{
                selector: ".algo .compTitle",
                event_name: "contextmenu"
            }
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },		
            {
                selector:"",
                properties: [
                    {
						selector:"div span",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
						selector:".title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{
                selector:".algo",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compTitle div span",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".title",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".AdsCard",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compText.tad-url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-abst",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#p",
                        property: "value",
                        name: "query",
                        type: "text"
                    },                    
					{
                        selector: ".tab.selected .tab-wrapper",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
	{
        name: "yahooAdsClickedLink",
		url_match: "*://*.yahoo.com/*",
        description: "This item collects links clicked by user from Yahoo search result",
		viewGroup: "Yahoo",
        title: "Ads clicked link",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".AdsCard",
                event_name: "click"
            },
			{
                selector: ".AdsCard",
                event_name: "contextmenu"
            }
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },            
			{
                selector:"",
                properties: [
                    {
						selector:".compText.tad-url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
						selector:".compText.tad-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{
                selector:".algo",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compTitle div span",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".title",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".AdsCard",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compText.tad-url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-abst",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#p",
                        property: "value",
                        name: "query",
                        type: "text"
                    },                    
					{
                        selector: ".tab.selected .tab-wrapper",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
	//aol
	{
        name: "aolSearchResult",
		url_match: "*://search.aol.com/aol/*",
        description: "This item collects AOL search results, search category, page number and corresponding search query",
		viewGroup: "AOL",
        title: "Search Result",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: "window",
                event_name: "load"
            }
        ],
        objects: [
            {
                selector:".algo",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compTitle div span",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".title",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".ads",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compText.tad-url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-abst span",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#p",
                        property: "value",
                        name: "query",
                        type: "text"
                    },                    
					{
                        selector: ".tab.selected .tab-wrapper",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
    {
        name: "aolClickedLink",
		url_match: "*://search.aol.com/aol/*",
        description: "This item collects links clicked by user from AOL search result",
		viewGroup: "AOL",
        title: "clicked link",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".algo .compTitle",
                event_name: "click"
            },
			{
                selector: ".algo .compTitle",
                event_name: "contextmenu"
            }
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },		
            {
                selector:"",
                properties: [
                    {
						selector:"div span",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
						selector:".title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{
                selector:".algo",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compTitle div span",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".title",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".ads",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compText.tad-url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-abst span",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#p",
                        property: "value",
                        name: "query",
                        type: "text"
                    },                    
					{
                        selector: ".tab.selected .tab-wrapper",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
	{
        name: "aolAdsClickedLink",
		url_match: "*://search.aol.com/aol/*",
        description: "This item collects Ads links clicked by user from AOL search result",
		viewGroup: "AOL",
        title: "Ads clicked link",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".ads .s-titleHdr",
                event_name: "click"
            },
			{
                selector: ".ads .s-titleHdr",
                event_name: "contextmenu"
            }			
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },		
            {
                selector:"",
                properties: [
                    {
						selector:".compText.tad-url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
						selector:".compText.tad-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{
                selector:".algo",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compTitle div span",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".title",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText p",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".ads",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".compText.tad-url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".compText.tad-abst span",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#p",
                        property: "value",
                        name: "query",
                        type: "text"
                    },                    
					{
                        selector: ".tab.selected .tab-wrapper",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
	//ask
	{
        name: "askSearchResult",
		url_match: "*://www.ask.com/*",
        description: "This item collects Ask search results, search category, page number and corresponding search query",
		viewGroup: "Ask",
        title: "Search Result",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: "window",
                event_name: "load"
            }
        ],
        objects: [
            {
                selector:".PartialSearchResults-item",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".PartialSearchResults-item-title a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: ".PartialSearchResults-item-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".PartialSearchResults-item-abstract",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: ".PartialSearchBox-input",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".PartialWebPagination-selected",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    }
                ]
            }
        ]
    },
    {
        name: "askClickedLink",
		url_match: "*://www.ask.com/*",
        description: "This item collects links clicked by user from Ask search result",
		viewGroup: "Ask",
        title: "clicked link",
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".PartialSearchResults-item-title",
                event_name: "click"
            },
			{
                selector: ".PartialSearchResults-item-title",
                event_name: "contextmenu"
            }
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },		
            {
                selector:"",
                properties: [
                    {
						selector:"a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
						selector:"a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{
                selector:".PartialSearchResults-item",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".PartialSearchResults-item-title a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: ".PartialSearchResults-item-title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".PartialSearchResults-item-abstract",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: ".PartialSearchBox-input",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".PartialWebPagination-selected",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    }
                ]
            }
        ]
    },
	//Baidu
	{
        name: "baiduSearchResult",
		url_match: "*://*.baidu.com/*",
        description: "This item collects Baidu search results, search category, page number and corresponding search query",
		viewGroup: "Baidu",
        title: "Search Result",
        type: "event",
		readyAt: "DOMChange",
        observingTargetNode: "#page",
        observingConfig: { attributes: false, childList: true, subtree: true },
        is_enabled: true,
        events: [
            {
                selector: ".",
                event_name: "."
            }
        ],
        objects: [
            {
                selector:".result",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".c-result-content .c-showurl",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".c-result-content .c-title-text",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".c-result-content .c-line-clamp3",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#kw",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".new-nowpage i",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    },
					{
                        selector: ".se-tabitem .se-tab-cur",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
    {
        name: "baiduClickedLink",
		url_match: "*://*.baidu.com/*",
        description: "This item collects links clicked by user from Baidu search result",
		viewGroup: "Baidu",
        title: "clicked link",
        type: "event",        
        is_enabled: true,
		readyAt: "DOMChange",
        observingTargetNode: "#wrapper_wrapper",
        observingConfig: { attributes: false, childList: true, subtree: true },
        events: [
            {
                selector: ".result",
                event_name: "click"
            }
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },		
            {
                selector:"",
                properties: [
                    {
						selector:".c-result-content .c-showurl",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
						selector:".c-result-content .c-title-text",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{
                selector:".result",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".c-result-content .c-showurl",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".c-result-content .c-title-text",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".c-result-content .c-line-clamp3",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#kw",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
                    {
                        selector: ".new-nowpage i",
                        property: "innerText",
                        name: "pageNumber",
                        type: "text"
                    },
					{
                        selector: ".se-tabitem .se-tab-cur",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
	//duckduckgo
    {
        name: "duckduckgoSearchResult",
		url_match: "*://duckduckgo.com/?*",
        description: "This item collects DuckDuckGo search results, search category, page number and corresponding search query",
		viewGroup: "DuckDuckGo",
        title: "Search Result",
        type: "event",
   		readyAt: "DOMChange",
        observingTargetNode: ".results--main",
        observingConfig: { attributes: false, childList: true, subtree: true },
        is_enabled: true,
        events: [
            {                
                event_name: ".",
                selector: ".",
            }
        ],
        objects: [
            {
                selector:".results .result.results_links_deep",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".result__body .result__title a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: ".result__body .result__title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".result__body .result__snippet",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".results--ads .result.results_links",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".result__body .result__extras .result__extras__url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".result__body .result__title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".result__body .result__snippet",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#search_form_input",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
					{
                        selector: "#duckbar_static .zcm__item a.is-active",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
    {
        name: "duckduckgoClickedLink",
		url_match: "*://duckduckgo.com/?*",
        description: "This item collects links clicked by user from DuckDuckGo search result",
		viewGroup: "DuckDuckGo",
        title: "clicked link",
        type: "event",
		readyAt: "DOMChange",
        observingTargetNode: ".results--main",
        observingConfig: { attributes: false, childList: true, subtree: true },
        is_enabled: true,
        events: [
            {
                selector: ".results .result.results_links_deep",
                event_name: "click"
            },
			{
                selector: ".results .result.results_links_deep",
                event_name: "contextmenu"
            }
        ],
        objects: [
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },
            {
                selector:"", 
                properties: [
                    {
                        selector: ".result__body .result__title a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: ".result__body .result__title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{
                selector:".results .result.results_links_deep",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".result__body .result__title a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: ".result__body .result__title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".result__body .result__snippet",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".results--ads .result.results_links",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".result__body .result__extras .result__extras__url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".result__body .result__title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".result__body .result__snippet",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#search_form_input",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
					{
                        selector: "#duckbar_static .zcm__item a.is-active",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]
    },
	{
        name: "duckduckgoAdsClickedLink",
		url_match: "*://duckduckgo.com/*",
        description: "This item collects advertising links clicked by user from DuckDuckGo search result",
		viewGroup: "DuckDuckGo",
        title: "Ads clicked link",
		readyAt: "DOMChange",
        observingTargetNode: ".results--main",
        observingConfig: { attributes: false, childList: true, subtree: true },
        type: "event",        
        is_enabled: true,
        events: [
            {
                selector: ".results--ads .result.results_links",
                event_name: "click"
            },
			{
                selector: ".results--ads .result.results_links",
                event_name: "contextmenu"
            }
        ],
        objects: [				
			{
                selector:"#", //event properties
                properties: [
                    {
                        property: "index",
                        name: "rank",
                        type: "text"
                    }
                ]
            },
            {
                selector:"", 
                properties: [
                    {
                        selector: ".result__body .result__title a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: ".result__body .result__title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    }
                ]
            },
			{
                selector:".results .result.results_links_deep",
                name: "searchResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".result__body .result__title a",
                        property: "href",
                        name: "link",
                        type: "url"
                    },
                    {
                        selector: ".result__body .result__title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".result__body .result__snippet",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
			{
                selector:".results--ads .result.results_links",
                name: "adsResult",
				indexName: "rank",
                properties: [
                    {
                        selector: ".result__body .result__extras .result__extras__url a",
                        property: "innerText",
                        name: "link",
                        type: "text"
                    },
                    {
                        selector: ".result__body .result__title a",
                        property: "innerText",
                        name: "title",
                        type: "text"
                    },
                    {
                        selector: ".result__body .result__snippet",
                        property: "innerText",
                        name: "description",
                        type: "text"
                    }
                ]
            },
            {
                selector:"body",
                properties: [
                    {
                        selector: "#search_form_input",
                        property: "value",
                        name: "query",
                        type: "text"
                    },
					{
                        selector: "#duckbar_static .zcm__item a.is-active",
                        property: "innerText",
                        name: "category",
                        type: "text"
                    }
                ]
            }
        ]		
	},
];