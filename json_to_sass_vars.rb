#!/usr/bin/env ruby

require 'json'
require 'sass'

@file_name = ARGV[0] || "caniuse_vars.scss"
@json_file = ARGV[1] || "docs/caniuse.json"
File.open(@file_name, 'w') {|file| file.truncate(0) }
@fpipe = File.open(@file_name, 'w')
def close
  @fpipe.close
end
def write_sass sass_o
  @fpipe << sass_o.to_sass(syntax: :scss)
  @fpipe << ";\n"
end

def write_var name, value
  var_name = Sass::Script::Tree::Variable.new(name)
  declaration = Sass::Script::Tree::Operation.new(var_name, value, :colon)
  write_sass declaration
end

def sass_string str
  Sass::Script::Value::String.new(str)
end

def sass_list array
  Sass::Script::Value::List.new(array, :comma)
end


caniuse = JSON.parse(File.read(@json_file))

browsers = caniuse["agents"]

versions_hash = Sass::Script::Value::Map.new(browsers.inject({}) do |h, (k, v)|
  h[sass_string(k)] = sass_list(v["versions"].collect { |version| sass_string(version) if version }.compact)
  h
end)
write_var("browser_versions", versions_hash)

prefix_hash = Sass::Script::Value::Map.new(browsers.inject({}) do |h, (k, v)|
  h[sass_string(k)] = sass_string(v["prefix"])
  h
end)
write_var("browser_prefixes", prefix_hash)

capabilities = caniuse["data"]

capabilities_h = Sass::Script::Value::Map.new(capabilities.collect do |k, v|
  stats = v["stats"].collect do |k, v|
    [sass_string(k), Sass::Script::Value::Map.new(v.inject({}) do |h, (k, v)|
      h[sass_string(k)] = sass_string(v)
      h
    end)]
  end
  [sass_string(k), Sass::Script::Value::Map.new(stats.to_h)]
end.to_h)
write_var("browser_capabilities", capabilities_h)

close
