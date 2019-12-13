class SiteController < ApplicationController
  def home
    render component: "CustomTable", props: { csrfToken: form_authenticity_token }
  end
end
