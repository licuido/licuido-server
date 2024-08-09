import { token_pledge } from "@models";

class TokenPledge {
  static async create(options: any): Promise<any> {
    try {
      return await token_pledge.create(options, {
        raw: false,
        returning: true,
      });
    } catch (error) {
      throw error;
    }
  }
  static async update(options: any, pledge_id: string): Promise<any> {
    try {
      // Update Token Offering Meta Data
      return await token_pledge.update(options, {
        where: {
          id: pledge_id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export { TokenPledge };
