class JsonWebToken
  SECRET_KEY = Rails.application.secrets.secret_key_base.to_s

  # turn user data (payload) to an encrypted string
  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode payload, SECRET_KEY, "HS256"
  end

  # decode token and return user info, this returns an array, [payload and algorithms]
  def self.decode(token)
    begin
      decoded = JWT.decode token, SECRET_KEY, true, { algorithm: "HS256" }
      # HashWithIndifferentAccess.new decoded
    rescue => e
      puts e
    end
  end
end