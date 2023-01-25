module Api
  module V1
    class ApiController < ActionController::API

      private

      def authenticate!
        # making a request to a secure route, token must be included in the headers
        decoded = JsonWebToken.decode(request.headers['token'])
        # getting user id from a nested JSON in an array.
        user_data = decoded[0]['user_id'] unless !decoded

        if user_data&.id
          # find a user in the database to be sure token is for a real user
          user = User.find(user_data&.id)
      
          # The barebone of this is to return true or false, as a middleware
          # its main purpose is to grant access or return an error to the user
      
          if user
            return true
          else
            render json: { message: 'invalid credentials' }, status: :not_found
          end
        else
          render json: { message: 'invalid credentials' }, status: :unauthorized
        end
      end
    end
  end
end
