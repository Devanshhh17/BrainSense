from app.services.predictor import BrainSensePredictor


predictor_service: BrainSensePredictor | None = None


def get_predictor() -> BrainSensePredictor:
  if predictor_service is None:
    raise RuntimeError("Predictor is not initialized yet.")
  return predictor_service
