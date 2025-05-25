Rails.application.routes.draw do
  # Define a route for the hello action
  get '/dashboard_links', to: 'dashboard#links'

  # For API-only applications, you might want to namespace your routes
  # namespace :api do
  #   namespace :v1 do
  #     get '/hello', to: 'greetings#hello'
  #   end
  # end
end
