#!/usr/bin/env ruby
# encoding: utf-8
require 'yaml'

dir = File.expand_path(File.dirname(__FILE__))
skip = %w[index.md README.md]
updated = 0
skipped = 0

Dir.glob(File.join(dir, '*.md')).sort.each do |path|
  file = File.basename(path)
  next if skip.include?(file)

  content = File.read(path, encoding: 'utf-8')

  if content.start_with?('---')
    skipped += 1
    next
  end

  title = File.basename(file, '.md')

  # Match: ![](<{{ site.baseurl }}/img/FILENAME>)
  image = nil
  if content =~ /!\[\]\(<\{\{ site\.baseurl \}\}\/img\/(.+?)>\)/
    image = "/img/#{$1}"
  end

  fm = { 'title' => title }
  fm['image'] = image if image

  new_content = YAML.dump(fm) + "---\n\n" + content
  File.write(path, new_content, encoding: 'utf-8')

  puts "  #{image ? '[img]' : '     '} #{file}"
  updated += 1
end

puts "\nDone: #{updated} updated, #{skipped} already had front matter."
