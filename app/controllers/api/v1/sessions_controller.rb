module Api
  module V1
    class SessionsController < Api::V1::ApiController
      def signup
        user = User.new(email: param[:email], password: password[:password])
    
        # if user is saved
        if user.save
          # we encrypt user info using the pre-define methods in application controller
          token = JsonWebToken.encode({ user_data: user.id })
    
          # return to user
          render json: { token: token }, status: :ok
        else
          # render error message
          render json: { message: "invalid credentials" }, status: :unauthorized
        end
      end
    
      def login
        user = User.find_by(email: param[:email])
    
        # you can use bcrypt to password authentication
        if user && user.password == param[:password]
    
          # we encrypt user info using the pre-define methods in application controller
          token = JsonWebToken.encode({ user_data: user.id })
    
          # return to user
          render json: { token: token }
        else
          render json: { message: "invalid credentials" }, status: :unauthorized
        end
      end
    end
  end
end
