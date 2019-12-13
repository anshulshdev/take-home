class UsersController < ApplicationController
  def index
    order = {}
    order[params[:sort_by].to_sym] = params[:asc] ? :asc : :desc if params[:sort_by].present?

    @users = User.order(order).offset((params[:page] - 1) * params[:per_page]).limit(params[:per_page])

    render json: { users: @users, total: User.count }
  end
end
