# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160912161658) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "developers", force: :cascade do |t|
    t.string   "name",               default: "",    null: false
    t.string   "email",              default: "",    null: false
    t.text     "bio",                default: "",    null: false
    t.string   "linkedin",           default: "",    null: false
    t.string   "login",              default: "",    null: false
    t.string   "provider",           default: "",    null: false
    t.string   "uid",                default: "",    null: false
    t.string   "access_token",       default: "",    null: false
    t.boolean  "remote",             default: false
    t.boolean  "relocate",           default: false
    t.boolean  "premium",            default: false
    t.boolean  "subscribed",         default: false
    t.boolean  "hireable",           default: false
    t.string   "jobs",               default: [],    null: false, array: true
    t.string   "platforms",          default: [],    null: false, array: true
    t.string   "location",           default: "",    null: false
    t.string   "encrypted_password", default: "",    null: false
    t.jsonb    "data",               default: "{}",  null: false
    t.integer  "sign_in_count",      default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.index ["data"], name: "index_developers_on_data", using: :gin
    t.index ["email"], name: "index_developers_on_email", unique: true, using: :btree
    t.index ["hireable"], name: "index_developers_on_hireable", using: :btree
    t.index ["jobs"], name: "index_developers_on_jobs", using: :gin
    t.index ["location"], name: "index_developers_on_location", using: :btree
    t.index ["login"], name: "index_developers_on_login", unique: true, using: :btree
    t.index ["platforms"], name: "index_developers_on_platforms", using: :gin
    t.index ["premium"], name: "index_developers_on_premium", using: :btree
    t.index ["relocate"], name: "index_developers_on_relocate", using: :btree
    t.index ["remote"], name: "index_developers_on_remote", using: :btree
    t.index ["subscribed"], name: "index_developers_on_subscribed", using: :btree
  end

end
