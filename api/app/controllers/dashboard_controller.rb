class DashboardController < ApplicationController
  # Since we're building an API, we skip CSRF protection
  # protect_from_forgery with: :null_session

  def links
    links = {
      app1: I18n.t('links.app1'),
      chronoquest: I18n.t('links.chronoquest'),
      api: I18n.t('links.api'),
      imosaic: I18n.t('links.imosaic'),
      backlog: I18n.t('links.backlog'),
      portfolio: I18n.t('links.portfolio'),
      blog: I18n.t('links.blog'),
      hub: I18n.t('links.hub'),
      python: I18n.t('links.python'),
    }

    render json: { links: links }, status: :ok
  rescue I18n::MissingTranslationData => e
    Rails.logger.error("Translation error: #{e.message}")
    render json: { message: 'Translation data missing.' }, status: :internal_server_error
  rescue StandardError => e
    Rails.logger.error("Unexpected error: #{e.message}")
    render json: { message: 'An unexpected error occurred.' }, status: :internal_server_error
  end
end
