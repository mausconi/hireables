class DevelopersResolver
  attr_reader :current_recruiter

  def self.call(*args)
    new(*args).call
  end

  def initialize(_obj, args, ctx)
    @current_recruiter = ctx[:current_recruiter]
  end

  def call
    query = Rails.cache.read(search_cache_key)
    api.fetch_developers(query)
  end

  private

  def search_cache_key
    "search/recruiter/#{current_recruiter.id}"
  end

  def api
    Github::Api.new
  end
end
