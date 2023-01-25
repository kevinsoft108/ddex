module Api
  module V1
    class UsersController < Api::V1::ApiController
      before_action :authenticate!

      def index
        render json: []
      end
    end
  end
end
