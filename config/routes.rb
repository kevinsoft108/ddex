Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      post '/login', to: 'sessions#login'
      post '/signup', to: 'sessions#signup'
      resources :users, only: %i[index]
    end
  end

  # Defines the root path route ('/')
  root 'pages#index'

  get '*path', to: 'pages#index'
end
