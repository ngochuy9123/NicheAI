const googleTrends = require("google-trends-api");

export interface TrendsDataPoint {
  time: string;
  value: number;
}

export interface RelatedQuery {
  query: string;
  value: number;
}

export interface TrendsAnalysisResult {
  keyword: string;
  timelineData: TrendsDataPoint[];
  averageInterest: number;
  growthRate: number;
  trend: "rising" | "declining" | "stable";
  relatedQueries: {
    top: RelatedQuery[];
    rising: RelatedQuery[];
  };
  regionalInterest: {
    geo: string;
    value: number;
  }[];
  insights?: string[];
}

// Google trends service for analyzing search trends.

export class GoogleTrendsService {
  // Get interest over time for a keyword
  async getInterestOverTime(
    keyword: string,
    startTime: Date = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    endTime: Date = new Date(),
    geo: string = "",
  ): Promise<TrendsDataPoint[]> {
    try {
      const result = await googleTrends.interestOverTime({
        keyword,
        startTime,
        endTime,
        geo,
      });
      const data = JSON.parse(result);
      const timelineData: TrendsDataPoint[] = [];

      if (data?.default?.timelineData) {
        for (const item of data.default.timelineData) {
          timelineData.push({
            time: item.formattedTime,
            value: item.value[0],
          });
        }
      }

      // Rate Limiting

      return timelineData;
    } catch (error) {
      console.error("Error fetching interest over time:", error);
      return [];
    }
  }
}
