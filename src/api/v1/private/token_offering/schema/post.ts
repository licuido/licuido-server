import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

const createTokenBody = Schema.object()
  .prop("name", Schema.string())
  .prop("description", Schema.string())
  .prop("start_date", Schema.string().format("date-time"))
  .prop("end_date", Schema.string().format("date-time"))
  .prop("bank_account_name", Schema.string())
  .prop("bank_name", Schema.string())
  .prop(
    "banner_asset",
    Schema.object()
      .prop("url", Schema.string().format("uri"))
      .prop("type", Schema.string())
      .required(["url", "type"])
  )
  .prop("base_currency", Schema.string())
  .prop("base_currency_code", Schema.string())
  .prop(
    "logo_asset",
    Schema.object()
      .prop("url", Schema.string().format("uri"))
      .prop("type", Schema.string())
      .required(["url", "type"])
  )
  .prop("blockchain_network", Schema.number())
  .prop("swift_bic_no", Schema.string())
  .prop("symbol", Schema.string())
  .prop("offering_price", Schema.number())
  .prop("is_all_countries_allowed", Schema.boolean())
  .prop("is_eligible_for_collateral_enabled", Schema.boolean())
  .prop("is_expected_annual_perc_yield_enabled", Schema.boolean())
  .prop("is_fund_rating_enabled", Schema.boolean())
  .prop("is_payback_period_enabled", Schema.boolean())
  .prop("is_projected_rate_of_return_enabled", Schema.boolean())
  .prop("isin_number", Schema.string())
  .prop("maximum_investment_limit", Schema.number())
  .prop("minimum_investment_limit", Schema.number())
  .prop("user_profile_id", Schema.number())
  .prop("jurisdiction", Schema.number())
  .prop("iban_no", Schema.string())
  .prop("status", Schema.number())
  .prop("status", Schema.number())
  .prop("token_type_id", Schema.number())
  .prop(
    "allowed_currencies",
    Schema.array().items(
      Schema.object()
        .prop("currency", Schema.string())
        .prop("currency_code", Schema.string())
        .required(["currency", "currency_code"])
    )
  )
  .prop("allowed_countries", Schema.array().items(Schema.number()))
  .prop(
    "documents",
    Schema.array().items(
      Schema.object()
        .prop("url", Schema.string().format("uri"))
        .prop("type", Schema.string())
        .required(["url", "type"])
    )
  )
  .prop(
    "teams",
    Schema.array().items(
      Schema.object()
        .prop("member_name", Schema.string())
        .prop("member_title", Schema.string())
        .prop(
          "member_picture",
          Schema.object()
            .prop("url", Schema.string().format("uri"))
            .prop("type", Schema.string())
            .required(["url", "type"])
        )
        .prop("member_type", Schema.string())
        .required([
          "member_name",
          "member_title",
          "member_picture",
          "member_type",
        ])
    )
  )
  .valueOf();

const tokenCreateResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const CREATE_TOKEN = {
  description: "The purpose of this schema is to create token offering",
  tags: ["TOKEN_OFFERING"],
  body: createTokenBody,
  response: makeResponseSchema(tokenCreateResponse),
};
