from dataclasses import dataclass, field
from typing import Any, Dict, List


@dataclass
class ModelArtifacts:
  model: Any = None
  model_name: str = ""
  metrics: Dict[str, Dict[str, float]] = field(default_factory=dict)
  feature_names: List[str] = field(default_factory=list)
