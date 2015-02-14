require 'kramdown'
require 'extensions/sitemap.rb'

###
## Blog settings
####

Time.zone = "America/Los_Angeles"

activate :blog do |blog|
  blog.prefix = "/blog"
  blog.permalink = ":year/:month/:day/:title.html"
  blog.sources = ":year-:month-:day-:title.html"
  blog.taglink = "tags/:tag.html"
  blog.layout = "article"
  blog.summary_separator = /(READMORE)/
  blog.summary_length = 250
  blog.year_link = ":year.html"
  blog.month_link = ":year/:month.html"
  blog.day_link = ":year/:month/:day.html"
  blog.default_extension = ".md"

  blog.tag_template = "/blog/tag.html"
  blog.calendar_template = "/blog/calendar.html"

  blog.paginate = true
  blog.per_page = 5
  blog.page_link = "page/:num"
end

page "/blog/feed.xml", :layout => false


# With no layout
page "robots.txt", :layout => false
page "humans.txt", :layout => false

# Generate sitemap after build
activate :sitemap_generator

# Syntax highlighting
activate :syntax, line_numbers: true

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :markdown_engine, :kramdown

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
end
