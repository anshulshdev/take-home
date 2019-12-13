Rails.application.routes.draw do
  root "site#home"
  post "users/index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
