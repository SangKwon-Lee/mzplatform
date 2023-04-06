import { SchedulesByMonth } from '../lib/redux/schedules';

export interface IArticleCategory {
  id: number;
  name: string;
}

export interface IArticleAuthor {
  id: number;
  name: string;
  position: string;
}

export interface IArticle {
  id: number;
  title: string;
  datetime: string;
  imageUrl: string | null;
  linkUrl: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  thumbnailUrl: string | null;
  author: IArticleAuthor | null;
  category: IArticleCategory;
}

export interface IArticleDetail {
  id: number;
  attribute: {
    title: string;
    datetime: string;
    imageUrl: string | null;
    linkUrl: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    thumbnailUrl: string | null;
    author: IArticleAuthor | null;
    category: IArticleCategory;
  };
}

export interface IBanner {
  id: number;
  title: string;
  backgroundColor: string | null;
  buttonTitle: string | null;
  linkUrl: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface INewsBottomSheet {
  openSheet: boolean;
  handleOpenSheet: undefined | (() => void);
  title: string;
  url: string;
  summary: string;
  photo?: string;
  publishDate: string;
  media: string;
}

export interface IIndexPrice {
  price: number;
  ratio: number;
  open: number;
  diff: number;
  high: number;
  low: number;
  last: number;
  volume: number;
  value: number;
  date: string;
  netPurchaseQuantityIndividual: number;
  netPurchaseQuantityCompany: number;
  netPurchaseQuantityForeigner: number;
  netPurchasePriceIndividual: number;
  netPurchasePriceCompany: number;
  netPurchasePriceForeigner: number;
}

export interface ChartSource {
  index?: MarketIndex;
  stockcode?: string;
}

export interface ChartStatus {
  status: boolean;
  message: string;
}

export interface ChartProps {
  onMouseLeave?: () => void;
  onMouseEnter?: (price: number) => void;
  type?: 'line' | 'candle';
  source: ChartSource;
  period?: ChartPeriod;
  width?: number;
  height?: number;
  realtimeMode?: boolean;
  onLoadEnd?: (loaded: ChartStatus) => void;
  fill?: boolean;
  seperateColor?: boolean;
}

export type MarketIndex = 'kospi' | 'kosdaq';
export type ChartPeriod = '1D' | '1W' | '1M' | '3M' | '1Y' | '3Y' | '5Y';

export interface IChartPeriodNav {
  name: string;
  period: ChartPeriod;
}

export interface IndexValue {
  value: number;
  diff: number;
  ratio: number;
  name: string;
}

export type ILoadingType = 'idle' | 'pending' | 'succeeded' | 'failed';
export type ISearchModeType = 'idle' | 'autocomplete' | 'searched' | 'no-contents' | 'ssr-searched';

export interface IStockChip {
  stockname: string;
  stockRatio: number;
}
export interface INews {
  id: number;
  url: string;
  title: string;
  mediaName: string;
  publishDate: string;
  summarized: string;
  source: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  newsId: string;
  photo: string | null;
  officeId: string;
  isSelected: null;
  isSelectedBy: null;
  date: null;
  stockList: {
    stockCode: string;
    stockName: string;
  }[];
  similarNewsList: ISimilarNews[];
}

export interface ISimilarNews {
  id: number;
  url: string;
  title: string;
  mediaName: string;
  publishDate: string;
  summarized: string;
  source: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  newsId: string;
  photo: string | null;
  officeId: string;
  isSelected: null;
  isSelectedBy: null;
  date: null;
  stockCode: string;
  stockName: string;
}

export interface IStockPrice {
  code: string;
  price: number;
  ratio: number;
  open: number;
  diff: number;
  high: number;
  low: number;
  last: number;
  date?: string;
  time?: string;
  volume?: number;
  value?: number;
}

export interface IStockExecutionPrice {
  price: number;
  ratio: number;
  last: number;
  cvolume: number;
  cgubun: string;
  date: string;
  chetime: string;
  volume: number;
  value: number;
}

export interface IIndex {
  price: number;
  diff: number;
  ratio: number;
}

export interface IKeyword {
  created_at: string;
  updated_at: string;
  description?: string | null;
  expert_feed?: any[];
  id?: number;
  isDeleted?: boolean | null;
  name: string;
  summary?: string | null;
  value?: number;
}

export interface ISchedule {
  id: number;
  keywords: IKeyword[];
  keywordRatio?: number;
  comment: string;
  created_at: string;
  priority: number;
  startDate?: string;
  endDate?: string;
  stocks: any[];
  title: string;
  updated_at: string;
  categories: any[];
}
export interface ITag {
  name: string;
  value: number;
  created_at: string;
  updated_at: string;
  id: number;
}
export interface ISearch {
  name: string;
  type: string;
  stockcode?: string;
  imageUrl?: string;
  tags?: ITag[] | [];
}

export interface ISearchAuto {
  name: string;
  type: string;
  stockcode?: string;
  imageUrl?: string;
}
export interface IHotStockResult {
  fromDate: string;
  count: number;
  stocks: IHotStock[];
}

export interface IHotStock {
  ranking: number;
  stockcode: string;
  stockname: string;
}

export interface IHistory {
  type: string;
  name: string;
}

export interface ISearchKeywordResult {
  count: number;
  data: {
    name: string;
    code: string;
    category: string;
    sectorCode: string;
    sectorName: string;
    updated_at: string;
    chosung: string;
    stockCode: string;
    price: {
      price: number;
      price_before: number;
      ratio: string;
      sign: string;
      open: number;
      high: number;
      low: number;
    };
    keywordList: ITag[] | [];
  }[];
}

export interface MarketServerSideProps {
  data: {
    kosdaqData: IIndex;
    kospiData: IIndex;
    scheduleData: ISchedule[];
    newsListData: INews[];
    multipleScheduleData: SchedulesByMonth;
  };
}

export interface MarketMajorServerSideProps {
  data: {
    mostViewData: {
      stock: string;
      percent: number;
    }[];
    indexData: IIndex;
    indexCollectionData: { name: string; value: number }[];
    newsListData: INews[];
  };
}

export interface ThemeStockServerSideProps {
  todayKeyword: ITodayKeyword;
  keywordData: {
    keyword: '';
    ratio: 0;
    percent: 0;
    price: 0;
    stock: [
      {
        name: '';
        percent: 0;
      },
    ];
  };
  keywordRatio: IKeywords[];
  keywordRainking: {
    up: {
      id: number;
      name: string;
      ratio: number;
    }[];
    down: {
      id: number;
      name: string;
      ratio: number;
    }[];
  };
}

export interface StockListServerSideProps {
  data: {
    stockList: IKeywordStockList;
    keyword: IKeywords;
  };
}

export interface IStockPopular {
  data: MZMost;
}

export interface StockDetailServerSideProps {
  stockInfo: IStockInfo;
}

export interface StockNewsServerSideProps {
  data: {
    stockNews: IStockNews[];
  };
}
export interface IKeywordNews {
  data: {
    keywordNews: IStockNews[];
  };
}

export interface StockTimeListSSRProps {
  data: {
    dailyPriceData: IStockPrice[];
    hourlyPriceData: IStockExecutionPrice[];
    dailyContiKey: string;
    hourlyContiKey: string;
  };
}
export interface IProduct {
  name: string;
  ratio: number;
}
export interface IReport {
  id: number;
  stockcode: string;
  title: string;
  datetime: string;
  author: string;
  source: string;
  url: string;
  created_at: string;
  updated_at?: string;
  report_id: string;
  content_id?: any;
}

export interface IStockInfoProps {
  data: {
    stockInfo: IStockInfo;
  };
}

export interface IStockInfo {
  stockInfo: {
    code: string;
    name: string;
    sector: string;
    irPhone: string;
    market: string;
    status: null;
    ceo: string;
    shares: number;
  };
  marketInfo: {
    mktCap: string;
    volume5ma: string;
    turnover5ma: string;
    ar1w: number;
    ar1m: number;
    ar3m: number;
    rr1w: number;
    rr1m: number;
    rr3m: number;
  };
  products: {
    name: string;
    ratio: number;
  }[];
  finance: {
    salesYearly: {
      year: string;
      sales: number;
      growthRate: string;
    }[];
    salesQuarterly: {
      quarter: string;
      sales: number;
      growthRate: string;
    }[];
    operatingProfitYearly: {
      year: string;
      operatingProfit: number;
      growthRate: string;
    }[];
    operatingProfitQuarterly: {
      quarter: string;
      operatingProfit: number;
      growthRate: string;
    }[];
  };
}

interface StockData {
  stockOpnion: IStockOpinion;
  stockNews: IStockNews[];
  stockInfo: IStockInfo;
  stockInvestment: {
    indicators: {
      per: number;
      pbr: number;
      roe: number;
    };
    allocation: {
      dividend: number;
      percent: number;
      time: string;
      cycle: number;
    };
  };
}

export interface IStockOpinion {
  score: number;
  opinion: string;
  analysisScore: {
    chart: number;
    earning: number;
    momentum: number;
    supply: number;
    total: number;
    value: number;
  };
  evaluation: {
    main_buyer: string;
    main_trading: string;
    net_pur_for: string;
    net_pur_inv: string;
    net_pur_pen: string;
    net_pur_prif: string;
    pbr_curr: number;
    pbr_in_rr: number;
    per_curr: number;
    per_in_rr: number;
    short_trend: string;
  };
  signal: {
    ad: string;
    total_strategy: string;
    trend: string;
    volume: string;
  };
  stock: {
    code: string;
    ir_phone: string;
    market: string;
    name: string;
    sector: string;
    status: string;
  };
}

export interface IStockNews {
  id: number;
  url: string;
  title: string;
  mediaName: string;
  publishDate: string;
  summarized: string;
  source: string;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  newsId: number;
  photo: string;
  officeId: number;
  isSelected: null;
  isSelectedBy: null;
  date: null;
}

export interface IStockInfo {
  stockcode: string;
  stockname: string;
  info: {
    id: number;
    code: string;
    name: string;
    category: string;
    per: number;
    pbr: number;
    marketCap: number;
    avgVolume: number;
    perCompEst: string;
    pbrCompEst: string;
    perComp: number;
    pbrComp: number;
    mainSupply: string;
    shortTrend: string;
    created_by: null;
    updated_by: null;
    created_at: string;
    updated_at: string;
    short: number;
    sector_us: null;
    oneshot_total_strategy: string;
    in_code: string;
    in_name: string;
    day_news_cnt: number;
    day_report_cnt: number;
    day_disclosure_cnt: number;
    except: number;
    roe: number;
    netPurchasePriceCompany: number;
    netPurchasePriceForeigner: number;
    netPurchasePriceIndividual: number;
    netPurchaseQuantityCompany: number;
    netPurchaseQuantityForeigner: number;
    netPurchaseQuantityIndividual: number;
    dividend: string;
    dividendYield: string;
  };
  price30d: {
    date: string;
    code: string;
    open: number;
    close: number;
    high: number;
    low: number;
    sign: number;
    diff: number;
    volume: number;
    value: number;
  }[];
  tags: {
    created_at: string;
    updated_at: string;
    description?: string | null;
    expert_feed?: any[];
    id: number;
    isDeleted?: boolean | null;
    name: string;
    summary?: string | null;
    value?: number;
  }[];
  master: {
    expcode: string;
    shcode: string;
    jseqno: number;
    hname: string;
    ename: string;
    bdate: number;
    infogroup: number;
    groupid: string;
    unitmmgubun: string;
    rightsgubun: string;
    parchggubun: string;
    openrecgubun: string;
    revaluegubun: string;
    recchggubun: string;
    randgubun: string;
    mktdgubun: string;
    mktwdgubun: string;
    govgubun: string;
    gwangubun: string;
    dishonest: string;
    detour_gu: string;
    stopgubun: string;
    upcodel: string;
    upcodem: string;
    upcodes: string;
    stdupcode: string;
    kospi2gubun: string;
    sigagubun: string;
    manuf_compgubun: string;
    krx_100: string;
    bjisu_stargubun: string;
    gov_forbengubun: string;
    tugubun: string;
    kspgubun: string;
    ksp1gubun: string;
    ksp50gubun: string;
    krx_autos: string;
    krx_semicon: string;
    krx_health: string;
    krx_banks: string;
    krx_it: string;
    krx_energychem: string;
    krx_steels: string;
    krx_consumer: string;
    krx_mediatel: string;
    krx_construct: string;
    krx_finance: string;
    krx_security: string;
    krx_shipbuild: string;
    subprice: number;
    parprice: number;
    issueprice: number;
    listdate: string;
    listing: number;
    disposalgubun: string;
    eps: number;
    per: number;
    epsgubun: string;
    bps: number;
    pbr: number;
    bpsgubun: string;
    lossgubun: string;
    share: number;
    sharegubun: string;
    divearnrate: number;
    mmsdate: string;
    mmedate: string;
    actsdate: string;
    actedate: string;
    actprice: number;
    capital: number;
    crdordgubun: string;
    inccapgubun: string;
    shusjugubun: string;
    gukmingubun: string;
    pprice: number;
    memedan: string;
    aftermemedan: string;
    reitsgubun: string;
    object: string;
    isomoneycode: string;
    nationcode: string;
    lpordgubun: string;
    tmmmgubun: string;
    gongmdgubun: string;
    socjisugubun: string;
    etfbasejisugubun: string;
    etfbaseupcode: string;
    krx_insurance: string;
    krx_transport: string;
    regulation_s: string;
    spacgubun: string;
    assgubun: string;
    subpricerate: number;
    krx_retail: string;
    krx_leisure: string;
    envjisugubun: string;
    greengubun: string;
    cautiousgubun: string;
    lasttran: string;
    srigov_gubun: string;
    shoverheatgubun: string;
    etf_clonegubun: string;
    etf_commoditytp: string;
    b_k200_highdiv: string;
    b_k200_lowvola: string;
    enddate: string;
    etncode: string;
    dividecode: string;
    laststdate: string;
    lastendate: string;
    kospi200cs_dup: string;
    cfiller0: string;
    lastidxval: number;
    idxvaluevol: number;
    uplmtvol: number;
    calculationorg: string;
    idx_marketid: string;
    idx_code: string;
    idx_trcode: string;
    idx_rfcode: string;
    idx_assetcode1: string;
    idx_assetcode2: string;
    ksd150gubun: string;
    krx300gubun: string;
    cfiller1: string;
    lowliquiditygb: string;
    vigubun: string;
    vicode: string;
    vichtime: string;
    vicltime: string;
  };
  analytics: {
    industryScore: string;
    marketcap: string;
    diagnose: string;
    diagnoseScore: 59;
    earning: string;
    earningScore: 35;
    value: string;
    valueScore: 60;
    supply: string;
    supplyScore: 42.5;
    tech: string;
    techScore: 63.33;
  };
}

export interface ITodayKeyword {
  id: number;
  datetime: string;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  keyword4: string;
  keyword5: string;
  keyword6: string;
  keyword7: string;
  keyword8: string;
  keyword9: string;
  keyword10: string;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
  value7: number;
  value8: number;
  value9: number;
  value10: number;
  stocks: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStockKeyword {
  count: number;
  data: {
    name: string;
    code: string;
    value: number;
    category: string;
    sectorCode: string;
    sectorName: string;
    updated_at: string;
    chosung: string;
    stockCode: string;
    marketCap: number;
    price: {
      price: number;
      price_before: number;
      ratio: string;
      sign: string;
      open: number;
      high: number;
      low: number;
    };
    keywordList: {
      created_at: string;
      updated_at: string;
      description?: string | null;
      expert_feed?: any[];
      id: number;
      isDeleted?: boolean | null;
      name: string;
      summary?: string | null;
      value?: number;
    }[];
  }[];
}

export interface IPriceList {
  shcode: string;
  hname: string;
  ename: string;
  price: number;
  sign: string;
  change: string;
  drate: string;
  volume: number;
  value: number;
  open: number;
  high: number;
  low: number;
  marketCap: number;
  jnilclose: number;
  keywordList: {
    created_at: string;
    updated_at: string;
    description?: string | null;
    expert_feed?: any[];
    id: number;
    isDeleted?: boolean | null;
    name: string;
    summary?: string | null;
    value?: number;
  }[];
}
export interface IKeywordStockList {
  count: number;
  data: {
    name: string;
    code: string;
    value: number;
    category: string;
    sectorCode: string;
    sectorName: string;
    updated_at: string;
    chosung: string;
    stockCode: string;
    marketCap: number;
    price: {
      price: number;
      price_before: number;
      ratio: string;
      sign: string;
      open: number;
      high: number;
      low: number;
    };
    keywordList: {
      created_at: string;
      updated_at: string;
      description?: string | null;
      expert_feed?: any[];
      id: number;
      isDeleted?: boolean | null;
      name: string;
      summary?: string | null;
      value?: number;
    }[];
  }[];
}

export interface IKeywordNews {
  id: number;
  url: string;
  title: string;
  mediaName: string;
  publishDate: string;
  summarized: string;
  newsId: string;
  photo: string;
  officeId: string;
  tag_id: number;
  tag_name: string;
  stockList: {
    stockCode: string;
    stockName: string;
  }[];
}

export interface StockList {}

export interface IKeywords {
  name: string;
  avgRatio: number;
  avgPrice: number;
  summary: string;
  description: string;
  stocks: {
    code: string;
    name: string;
    price: number;
    diff: number;
    ratio: number;
    open: number;
    high: number;
    low: number;
  }[];
}

export interface IFeeds {
  category: string;
  clubId: number;
  clubTitle: string;
  commentCount: number;
  commentRequired: string;
  contents: string;
  createdDatetime: string;
  feedId: number;
  files: {
    fileId: number;
    fileUrl: string;
    targetId: number;
  }[];
  member: {
    memberId: number;
    nickname: string;
    roleTypeCode: string;
    profileUrl: string;
    selfIntroduction: string;
  };
  myReactIconTypeCode: string;
  ogDescription: string;
  ogImage: string;
  ogTitle: string;
  ogUrl: string;
  pinDatetime: string;
  pollEndDate: string;
  pollItems: {
    itemName: string;
    pollItemId: number;
    sortOrder: number;
    voteCount: number;
  }[];
  pollYn: string;
  reacts: {
    iconTypeCode: string;
    count: number;
  }[];
  title: string;
  updatedDatetime: string;
  viewCount: number;
}

export interface MZMost {
  fromDate: string;
  count: number;
  stocks: {
    ranking: number;
    stockcode: string;
    stockname: string;
    marketCap: number;
    keywordList?: {
      created_at: string;
      name: string;
      updated_at: string;
      value: number;
    }[];
  }[];
}
