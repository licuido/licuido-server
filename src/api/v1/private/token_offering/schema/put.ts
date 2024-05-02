import { makeResponseSchema } from "@helpers";
import Schema, { JSONSchema } from "fluent-json-schema";

/* For Update Token Status */
const updateTokenStatusBody = Schema.object()
  .prop("status_id", Schema.number())
  .prop("token_id", Schema.string())
  .valueOf();

const updateTokenStatusResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const UPDATE_TOKEN_STATUS = {
  description: "The purpose of this schema is to update token offering status",
  tags: ["TOKEN_OFFERING"],
  body: updateTokenStatusBody,
  response: makeResponseSchema(updateTokenStatusResponse),
};

/* For Update Token Offerings */
const updateTokenBody = Schema.object()
  .prop("token_id", Schema.string().format("uuid"))
  .prop("name", Schema.string())
  .prop("isin_number", Schema.string())
  .prop("symbol", Schema.string())
  .prop("token_type_id", Schema.number())
  .prop("base_currency", Schema.string())
  .prop("base_currency_code", Schema.string())
  .prop("blockchain_network", Schema.number())
  .prop(
    "logo_asset",
    Schema.object()
      .prop("url", Schema.string().format("uri"))
      .prop("type", Schema.string())
      .required(["url", "type"])
  )
  .prop("description", Schema.string())
  .prop(
    "banner_asset",
    Schema.object()
      .prop("url", Schema.string().format("uri"))
      .prop("type", Schema.string())
      .required(["url", "type"])
  )
  .prop("offering_price", Schema.number())
  .prop("jurisdiction", Schema.number())
  .prop("start_date", Schema.string().format("date-time"))
  .prop("end_date", Schema.string().format("date-time"))
  .prop(
    "added_currencies",
    Schema.array()
      .items(
        Schema.object()
          .prop("currency", Schema.string())
          .prop("currency_code", Schema.string())
          .required(["currency", "currency_code"])
      )
      .minItems(0)
  )
  .prop(
    "removed_currencies",
    Schema.array().items(Schema.string().format("uuid")).minItems(0)
  )
  .prop("maximum_investment_limit", Schema.number())
  .prop("minimum_investment_limit", Schema.number())
  .prop("is_all_countries_allowed", Schema.boolean())
  .prop("added_countries", Schema.array().items(Schema.number()).minItems(0))
  .prop(
    "removed_countries",
    Schema.array().items(Schema.string().format("uuid")).minItems(0)
  )
  .prop("bank_account_name", Schema.string())
  .prop("bank_name", Schema.string())
  .prop("swift_bic_no", Schema.string())
  .prop("iban_no", Schema.string())
  .prop("is_fund_rating_enabled", Schema.boolean())
  .prop("is_projected_rate_of_return_enabled", Schema.boolean())
  .prop("is_expected_annual_perc_yield_enabled", Schema.boolean())
  .prop("is_payback_period_enabled", Schema.boolean())
  .prop("is_eligible_for_collateral_enabled", Schema.boolean())
  .prop(
    "added_documents",
    Schema.array()
      .items(
        Schema.object()
          .prop("url", Schema.string().format("uri"))
          .prop("type", Schema.string())
          .required(["url", "type"])
      )
      .minItems(0)
  )
  .prop(
    "removed_documents",
    Schema.array().items(Schema.string().format("uuid")).minItems(0)
  )
  .prop(
    "new_team_members",
    Schema.array()
      .items(
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
      .minItems(0)
  )
  .prop(
    "removed_team_members",
    Schema.array().items(Schema.string().format("uuid")).minItems(0)
  )
  .prop(
    "updated_team_members",
    Schema.array()
      .items(
        Schema.object()
          .prop("member_id", Schema.string())
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
          .required(["member_name", "member_title", "member_type"])
      )
      .minItems(0)
  )
  .required(["token_id"])
  .valueOf();

const tokenUpdateResponse: JSONSchema = Schema.object()
  .prop("data", Schema.object().prop("message", Schema.string()))
  .valueOf() as JSONSchema;

export const UPDATE_TOKEN_OFFERINGS = {
  description: "The purpose of this schema is to update token offering",
  tags: ["TOKEN_OFFERING"],
  body: updateTokenBody,
  response: makeResponseSchema(tokenUpdateResponse),
};
